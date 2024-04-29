<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class CustomerController extends Controller
{

   /**
 * @OA\Get(
 *     path="/api/users",
 *     operationId="getUsers",
 *     tags={"Users"},
 *     summary="Retrieve users",
 *     description="Returns a list of users",
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/User")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Bad request"
 *     )
 * )
 */
public function index() {
    return User::all();
}
 // Register new customer
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers',
            'password' => 'required|string|min:8',
        ]);

        $customer = new User([
            'name' => $request->name,
            'email' => $request->email,
            'is_customer' => true,
            'point' => 100,
            'password' => Hash::make($request->password),
        ]);

        $customer->save();

        $token = JWTAuth::fromUser($customer);

        return response()->json([
            'message' => 'Successfully registered',
            'access_token' => $token,
            'customer'=> $customer,
            'token_type' => 'bearer',
            'expires_in' =>  Auth::guard('user')->factory()->getTTL() * 60
        ]);
    }

    public function login(Request $request)
{
    try {
         $credentials = $request->only('email', 'password');

    if (!$token = Auth::guard('api')->attempt($credentials)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    $user = Auth::guard('api')->user();  // Retrieve user from the authentication guard directly
    $token = JWTAuth::fromUser($user);

       return $this->respondWithToken($token, $user);
} catch (\Exception $e) {
    return response()->json(['error' => 'Could not create token'], 500);
}
}

protected function respondWithToken($token, $user)
{
    return response()->json([
        'access_token' => $token,
        'customer' => $user,  // Consider what user information to expose
        'token_type' => 'bearer',
        'expires_in' => Auth::guard('api')->factory()->getTTL() * 60
    ]);
}

    public function logout()
{
     Auth::guard('user')->logout();
    return response()->json(['message' => 'Successfully logged out']);
}



    // Existing login and logout methods...
}
