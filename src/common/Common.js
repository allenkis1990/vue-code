/**
 * Created by 小灰灰 on 2017/10/24.
 ${customer.Address}
 */

export default function (router, store) {
  //
  let assignTabMapper = {
    '/Home': 1,
    '/Category': 2,
    '/MyCourse': 3,
    '/Center': 4
  }

  router.beforeEach((to, from, next) => {
    console.log(from,'from');
    console.log(to,'to');
    if (to.path) {
      let findOut = assignTabMapper[to.path.replace(/^(\/.*?)\/.*?$/, '$1')]
      if (findOut) {
        store.dispatch('changeNav', findOut)
      }
    }
    next()
  })
}
