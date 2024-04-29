<?php

return [
    'default' => 'default',
    'documentations' => [
        'default' => [
            'api' => [
                'title' => 'Laravel Swagger API',
            ],
            'routes' => [
                /*
                 * Route for accessing parsed swagger annotations.
                 */
                'api' => 'api/documentation',

                /*
                 * Route for Oauth2 authentication callback.
                 */
                'oauth2_callback' => 'api/oauth2-callback',

                /*
                 * Middleware allows you to add your own middleware to this route group.
                 */
                'middleware' => [
                    'api' => [],
                    'asset' => [],
                    'docs' => [],
                    'oauth2_callback' => [],
                ],
            ],
            'paths' => [
                /*
                 * Absolute path to location where parsed annotations will be stored.
                 */
                'docs_json' => 'api-docs/api-docs.json',

                /*
                 * Absolute path to YAML annotations file.
                 */
                'annotations' => base_path('app'),


            ],
        ],
    ],

];

