This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


[API routes](https://nextjs.org/docs/api-routes/introduction) are as follows:
* GET [http://localhost:3000/api/applications](http://localhost:3000/api/applications). This endpoint can be edited in `pages/api/applications/index.ts`.

* DELETE [http://localhost:3000/api/applications/<applicationId>](http://localhost:3000/api/applications/<applicationId>). This endpoint can be edited in `pages/api/applications/[applicationId].ts`.

* POST [http://localhost:3000/api/decision_engine](http://localhost:3000/api/decision_engine). This endpoint can be edited in `pages/api/decision_engine.ts`.

* GET [http://localhost:3000/api/balance_sheet](http://localhost:3000/api/balance_sheet). This endpoint can be edited in `pages/api/balance_sheet.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Test the System

Please use the following combination to test.

```
[
    {
        "company":"ABC","accountingProvider:"Xero"
    },
    {
        "company":"XYZ","accountingProvider:"MYOB"
    }
]
```
To add more test cases, please modify `config/sheet.tsx`
