declare module "airbridge-cordova-sdk" {

    /**
     * main class (singleton)
     */
    class Airbridge {
        event: Event;
        deeplink: Deeplink;
        state: State;
        placement: Placement;

        /**
         * Send Goal-Event to server.
         * @param {string} category event name
         * @param {EventOption} [option={}] event options
         */
        trackEvent(category: string, option?: EventOption): void;

        /**
         * Set device alias
         * @param {string} key - device alias key
         * @param {string} value - device alias value
         */
        setDeviceAlias(key: string, value: string): void;

        /**
         * Remove device alias
         * @param {string} key - callback of attribution
         */
        removeDeviceAlias(key: string): void;

        /**
         * clear device alias
         */
        clearDeviceAlias(): void;

        /**
         * register push token
         * @param {string} token - push token
         */
        registerPushToken(token: string): void;
    }
    
    /**
     * @param deeplink - URL of deeplink
     */
    type DeeplinkListener = (deeplink: string) => void;
    
    /**
     * class for set SDK's deeplink behavior (singleton)
     */
    class Deeplink {
        /**
         * Set DeeplinkListener (listen deeplink or deferred-deeplink)<br/>
         * @param listener - callback of deeplink & deferred-deeplink
         */
        setDeeplinkListener(listener: DeeplinkListener): void;
    }
    
    /**
     * class for send event (singleton)
     */
    class Event {
        
        /**
         * Send Goal-Event to server.
         * @param {string} category event name
         * @param {EventOption} [option={}] event options
         */
         trackEvent(category: string, option?: EventOption): Promise<void>;
    }
    
    /**
     * class for use SDK's placement function (singleton)
     */
    class Placement {
        /**
         * 1. send +1 click statistics to server<br/>
         * 2. get deeplink and fallback from server<br/>
         * 3. open deeplink. when fail, open fallback<br/>
         * 4. parameter's deeplink, fallback is spare for network-fail
         * @param trackingLink - created on dashboard
         * @param [deeplink = null] - to open other app (spare for network-fail)
         * @param [fallback = null] - is opened when fail on deeplink (spare for network-fail)
         */
        click(trackingLink: string, deeplink?: string, fallback?: string): Promise<void>;
        /**
         * send +1 impression statistics to server<br/>
         * @param trackingLink - created on dashboard
         */
        impression(trackingLink: string): Promise<void>;
    }
    
    /**
     * class for manage SDK's state (singleton)
     */
    class State {
        /**
         * set current user<br/>
         *
         * user.property is null, if input.property is null
         * @param user - user infomation
         */
        setUser(user: User): Promise<void>;
        /**
         * update current user<br/>
         *
         * user.property not be changed, if input.property is null
         * @param user - user infomation
         */
        updateUser(user: User): Promise<void>;
        /**
         * make airbridge start tracking
         */
        startTracking(): Promise<void>;
    }
    
    /**
     * @property {string} [action] event group name 1
     * @property {string} [label] event group name 2
     * @property {number} [value] event custom value
     * @property {{}} [customAttributes] event custom attributes
     * @property {{}} [semanticAttributes] event semantic attributes
     */
    type EventOption = {
        action?: string;
        label?: string;
        value?: number;
        customAttributes?: {
            [key: string]: string;
        };
        semanticAttributes?: {
            [key: string]: any;
        };
    };
    
    /**
     * @property [ID] - Product's unique identifier
     * @property [name] - Product's name
     * @property [currency] - currency in <a href='https://en.wikipedia.org/wiki/ISO_4217'>ISO 4217<a/>
     * @property [price] - Product's price
     * @property [quantity] - Purchased quantity
     * @property [position] - Product's index in list
     */
    type Product = {
        ID?: string;
        name?: string;
        currency?: string;
        price?: number;
        quantity?: number;
        position?: number;
    };
    
    /**
     * @property [ID] - User's ID (not allow empty string)
     * @property [email] - User's Email (not allow empty string)
     * @property [phone] - User's Phone Number (not allow empty string)
     * @property [alias] - User's Alias
     * @property [attributes] - User's Attributes
     */
    type User = {
        ID?: string;
        email?: string;
        phone?: string;
        alias?: {
            [key: string]: string;
        };
        attributes?: {
            [key: string]: any;
        };
    };

    const AirbridgeCategory: {
        SIGN_UP: string
        SIGN_IN: string
        SIGN_OUT: string

        HOME_VIEW: string
        SEARCH_RESULT_VIEW: string
        PRODUCT_LIST_VIEW: string
        PRODUCT_DETAILS_VIEW: string

        ADD_TO_CART: string
        ORDER_COMPLETED: string
    }

    const AirbridgeAttributes: {
        QUERY: string
        PRODUCT_LIST_ID: string
        CART_ID: string
        TRANSACTION_ID: string
        PRODUCTS: string
        IN_APP_PURCHASED: string
        CURRENCY: string
        TOTAL_VALUE: string
        TOTAL_QUANTITY: string
    }

    const AirbridgeProduct: {
        PRODUCT_ID: string
        NAME: string
        CURRENCY: string
        PRICE: string
        QUANTITY: string
        POSITION: string
    }
    
    const airbridge: Airbridge;

    export default airbridge;

    export {
        AirbridgeCategory,
        AirbridgeAttributes,
        AirbridgeProduct,
    }
}
