/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const SERVICE_NAME = "api";

const utils = use("Src/Foundation/Utilities");
const FoundationServiceProvider = use(
  "Src/Foundation/FoundationServiceProvider"
);
const Routes = use("Src/Services/Api/Routes");

/**
 * Registers and sets upthe internals of this service.
 *
 * **Namespace**: `Src/Services/Api/Providers/ApiServiceProvider` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class ApiServiceProvider
 */
class ApiServiceProvider extends FoundationServiceProvider {
  /**
   * Registers bindings for this service. It is invoked at startup.
   *
   * @method register
   *
   * @return {Void}
   */
  register() {
    const self = this;

    Routes.map(route => {
      let { controller } = route;

      self.registerControllerBinding(controller);
    });
  }

  /**
   * Registers route controllers for this service. Sets up routes when our app boots.
   *
   * @method boot
   *
   * @return {Void}
   */
  boot() {
    this.app
      .use("Route")
      .group(() => {
        const self = this;

        Routes.map(routeItem => {
          let { route, controller, handler, method } = routeItem;

          let isProtected =
            typeof routeItem.protected === "undefined"
              ? false
              : routeItem.protected;

          self.registerRouteController(
            utils.uppercaseFirstChar(SERVICE_NAME),
            route,
            controller,
            handler,
            method,
            isProtected
          );
        });
      })
      .prefix(`/${SERVICE_NAME}/v1/`);
  }
}

module.exports = ApiServiceProvider;
