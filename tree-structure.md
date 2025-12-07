.
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/ 
│   │   ├──db.ts
|   │   └──index.ts
│   │
│   ├── middleware/                     
│   │   └── auth.middleware.ts
│   │
│   └── modules/                        
│       │
│       ├── auth/
│       │   ├── auth.routes.ts   
│       │   ├── auth.controller.ts      # Request Handler
│       │   └── auth.service.ts         # bcrypt
│       │
│       ├── bookings/
│       │   ├── booking.routes.ts
│       │   ├── booking.controller.ts
│       │   └── booking.service.ts
│       │
│       ├── users/
│       │   ├── user.routes.ts
│       │   ├── user.controller.ts
│       │   └── user.service.ts
│       │
│       └── vehicles/
│           ├── vehicle.routes.ts
│           ├── vehicle.controller.ts
│           └── vehicle.service.ts
│       
│
├── .env 
├── package.json
└── tsconfig.json   