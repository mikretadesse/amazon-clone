<!-- 1. Root Project -->
amazon-clone/
├── frontend/        # React frontend
├── backend/         # Node.js/Express backend
├── screenshoots
├── README.md
├── .gitignore
└── package.json     # optional if you have root scripts

<!-- 2. Frontend Structure (frontend/) -->
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── Api/                     # API calls and endpoints
│   │   └── EndPoints.js
│   ├── assets/                  # Images, icons, logos, carousel images
│   │   ├── logo/
│   │   └── img-carousel/
│   ├── Components/              # Reusable UI components
│   │   ├── Carousel/
│   │   ├── Category/
│   │   ├── CurrencyFormater/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Loader/
│   │   ├── LowerHeader/
│   │   ├── Product/
│   │   ├── ScrollToTop/
│   │   └── SharedLayout/
│   ├── Pages/                   # Route pages
│   │   ├── Auth/
│   │   │   └── Signup.jsx
│   │   ├── Carts/
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── NotFound/
│   │   ├── Orders/
│   │   ├── Payment/
│   │   ├── ProductDetails/
│   │   ├── Results/
│   │   └── Utility/             # Reducers, actions, constants
│   ├── App.jsx                  # Main App
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js               # if using Vite
└── README.md

<!-- 3. Backend Structure (backend/) -->
backend/
├── controllers/               # Business logic for routes
│   ├── productController.js
│   ├── userController.js
│   └── orderController.js
├── models/                    # Database models (MongoDB/Mongoose or SQL)
│   ├── Product.js
│   ├── User.js
│   └── Order.js
├── routes/                    # API route definitions
│   ├── productRoutes.js
│   ├── userRoutes.js
│   └── orderRoutes.js
├── middleware/                # Authentication, error handling
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── config/                    # DB connection, env variables
│   └── db.js
├── utils/                     # Utility functions (currency formatting, etc.)
├── server.js                  # Main server entry
├── package.json
└── .env                       # Secrets (DB URL, JWT secret)
