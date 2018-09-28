/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
'use strict';

const path = require('path');
const { ServiceProvider } = require('@adonisjs/fold');
const SERVICES_PATH = '../'

/**
 * FoundationServiceProvider is the core service provider.
 * It is to be extended by other service providers within the Hexa framework as sort of a base class.
 *
 * **Namespace**: `Src/Foundation/FoundationServiceProvider` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class FoundationServiceProvider
 * @constructor
 */
class FoundationServiceProvider extends ServiceProvider
    /**
     * This method will be called at startup by Adonis.
     * It registers all the micro-services our app will need.
     *
     * An array of path strings to all micro-service providers is returned.
     *
     * @attribute bootstrapServices
     *
     * @type {Array}
     */
    bootstrapServices() {
        return [
            this._resolveServiceProvider('Api/Providers', 'ApiServiceProvider')
        ].join(',');
    }

    /**
     * Parses and returns a fully qualified path to a ServiceProvider class
     * when the providers path and provider are passed as arguments.
     *
     * @method resolveServiceProvider
     *
     * @param {String} providersPath
     * @param {String} provider
     *
     * @return {String}
     *
     * @private
     */
    _resolveServiceProvider(providersPath, provider) {
        return path.join(__dirname, SERVICES_PATH, providersPath, provider)
    }

    /**
     * Will be used to register routes by our micro services.
     * This method is called by classes that extends the FoundationServiceProvider class.
     *
     * @method registerRouteController
     *
     * @param {String} route - The URL route. Could pass in "/puppies" here
     * @param {String} controller - The class that handles this request. E.g: "OrderController"
     * @param {String} handler - The class method on the controller class that processes this request.
     * @param {String} method - The authorized HTTP method for this request. Example: "put, post, get, resource"
     * @param {Boolean} isProtected - Checks if the request must pass some authorization for a JWT token or cookie.
     *
     * @return {Void}
     */
    registerRouteController(service, route, controller, handler='', method='resource', isProtected=false) {
        const namespace = `@provider:${service}/Controllers/Http/`;

				let instance = this.app
					.use('Route')
					[method](route, `${namespace}${controller}`)
					.middleware(isProtected ? 'auth' : [])
    }

    /**
     * Creates an Inversion-of-Control (IOC) binding instance for our class.
     * This will by called by the `register` method of inheriting child classes.
     * Pretty useful in helping Adonis quickly make our controllers available for use.
     *
     * @method registerRouteController
     *
     * @param {String} controller - The controller we'd like bound to the IOC instance. E.g: OrderController.
     * @param {String} service - The micro-service of interest in this case, the API service.
     *
     * @return {Object}
     */
    registerControllerBinding(controller, service='Api') {
        controller = controller.split('.')[0];
        let path = `Src/Services/${service}/Http/Controllers/`;
        let namespace = `${service}/Controllers/Http/${controller}`

        let resolvedController = use(`${path}${controller}`);

        return this.app.bind(namespace, () => new resolvedController());
    }

}

module.exports = FoundationServiceProvider;
