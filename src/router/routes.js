const routes = [{
        path: '',
        component: () => import ('layouts/MainLayout.vue'),
        children: [
            { path: '/', component: () => import ('pages/Index.vue') },
            { path: 'payment', component: () => import ('pages/payment.vue') },
            { path: 'paymentresult', component: () => import ('pages/ResultPayment.vue') }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    }
]
export default routes