<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $customerId = $request->query('customer_id', null);

        $orders = Order::where('customer_id', '=', $customerId)
                        ->where('status', '=', 0)
                        ->with(['book', 'user'])->get();

        return response()->json(['data' => $orders]);
    }
    public function getOrders(Request $request)
    {
        $customerId = $request->query('customer_id', null);

        $orders = Order::where('customer_id', '=', $customerId)
                        ->where('status', '=', 1)
                        ->with(['book', 'user'])->get();

        return response()->json(['data' => $orders]);
    }
    // POST: Create a new order
    public function addOrder(Request $request)
    {

        $customerId = $request->query('customer_id');

// Check for null customer ID to prevent unintentional updates
if (is_null($customerId)) {
    return response()->json(['message' => 'Customer ID is required'], 400);
}

try {
    $orders = Order::where('customer_id', $customerId)->get();

    // Check if there are any orders to process
    if ($orders->isEmpty()) {
        return response()->json(['message' => 'No orders found for this customer'], 404);
    }

    // Start transaction
    DB::transaction(function () use ($orders, $customerId) {
        $totalPointsToDeduct = 0;

        // Calculate total points to deduct
        foreach ($orders as $order) {
            $totalPointsToDeduct += $order->point; // Assume 'points' is the field in Order
            $order->status = 1;
            $order->save();
        }

        // Deduct points from user
        $user = User::find($customerId);
        if ($user && $user->point >= $totalPointsToDeduct) {
            // Deduct points and save all changes
            $user->point -= $totalPointsToDeduct;
            $user->save();


        } else {
            // If user doesn't have enough points, abort transaction and throw an error
             throw new \Exception("Insufficient points: This user does not have enough points to complete this operation.");

            // return response()->json(['message' => 'Insufficient points: This user does not have enough points to complete this operation' ], 400);
        }
    });

    return response()->json(['message' => 'Orders updated and points deducted successfully'], 200);
} catch (\Exception $e) {
    // Log the exception for debugging
    return response()->json(['message' => 'Failed to update orders and deduct points due to an internal error: '], 500 );

    Log::error($e->getMessage());
}

        return response()->json(['message' => 'Orders status updated successfully']);

    }
    public function store(Request $request)
    {
            $validatedData = $request->validate([
                'customer_id' => 'required|integer',
            'book_id' => 'required|integer',
            'point' => 'required|numeric'
        ]);

        // Now manually add the status to the validated data
        $validatedData['status'] = 0;

        $order = Order::create($validatedData);


        return response()->json($order, 201);
    }

    // GET: Display a specific order
    public function show($id)
    {
        $order = Order::with(['book', 'user'])->find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    // PUT/PATCH: Update an existing order
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $request->validate([
            'customer_id' => 'integer',
            'book_id' => 'integer',
            'status' => 'integer',
            'point' => 'numeric'
        ]);

        $order->update($request->all());

        return response()->json($order);
    }

    // DELETE: Remove an order
    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
