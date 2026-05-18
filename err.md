ERROR /order

2026-05-18 16:28:23.611 [error] Error [PrismaClientKnownRequestError]: 
Invalid `prisma.order.findMany()` invocation:


The table `public.ShipmentUpdate` does not exist in the current database.
    at async k (.next/server/chunks/ssr/[root-of-the-server]__0-nq4wx._.js:1:14706) {
  code: 'P2021',
  meta: {
    modelName: 'Order',
    driverAdapterError: Error [DriverAdapterError]: TableDoesNotExist
        at F.onError (.next/server/chunks/ssr/_0qcjj1l._.js:1:11701)
        at F.performIO (.next/server/chunks/ssr/_0qcjj1l._.js:1:11642)
        at async F.queryRaw (.next/server/chunks/ssr/_0qcjj1l._.js:1:8228) {
      [cause]: [Object]
    }
  },
  clientVersion: '7.8.0',
  digest: '2916174713'
}

ERROR /admin/custom-orders 

2026-05-18 16:27:25.350 [error] Error [PrismaClientKnownRequestError]: 
Invalid `prisma.customOrder.findMany()` invocation:


The table `public.CustomOrder` does not exist in the current database.
    at async n (.next/server/chunks/ssr/app_dashboard_custom-orders_0jnccau._.js:1:4622) {
  code: 'P2021',
  meta: {
    modelName: 'CustomOrder',
    driverAdapterError: Error [DriverAdapterError]: TableDoesNotExist
        at F.onError (.next/server/chunks/ssr/_0qcjj1l._.js:1:11701)
        at F.performIO (.next/server/chunks/ssr/_0qcjj1l._.js:1:11642)
        at async F.queryRaw (.next/server/chunks/ssr/_0qcjj1l._.js:1:8228) {
      [cause]: [Object]
    }
  },
  clientVersion: '7.8.0',
  digest: '2739936114'
}
