declare module "airbridge-cordova-sdk" {

	/**
	 * main class (singleton)
	 */
	class Airbridge {
	    event: Event;
	    deeplink: Deeplink;
	    state: State;
	    placement: Placement;
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
	     * 1. Send SignIn-Event to server.<br/>
	     * 2. Set Tracker's user which is put on all of next events.
	     * @param [user = null] - user infomation
	     * @param [option = null] - event custom infomation
	     */
	    signIn(user?: User, option?: EventOption): Promise<void>;
	    /**
	     * 1. Send SignUp-Event to server.<br/>
	     * 2. Set Tracker's user which is put on all of next events.
	     * @param [user = null] - user infomation
	     * @param [option = null] - event custom infomation
	     */
	    signUp(user?: User, option?: EventOption): Promise<void>;
	    /**
	     * 1. Send signOut-Event to server.<br/>
	     * 2. Set Tracker's user with null which is put on all of next events.
	     * @param [option = null] - event custom infomation
	     */
	    signOut(option?: EventOption): Promise<void>;
	    /**
	     * Send ViewHome-Event to server.
	     * @param [option = {}] - event custom infomation
	     */
	    viewHome(option?: EventOption): Promise<void>;
	    /**
	     * Send ViewProductList-Event to server.
	     * @param [data.listID] - Product-List's unique identifier
	     * @param [data.products] - Product-List
	     * @param [option = {}] - event custom infomation
	     */
	    viewProductList(data?: {
	        listID?: string;
	        products?: Product[];
	    }, option?: EventOption): Promise<void>;
	    /**
	     * Send ViewSearchResult-Event to server.
	     * @param [data.query] - Product-List's unique identifier
	     * @param [data.products] - Product-List
	     * @param [option = {}] - event custom infomation
	     */
	    viewSearchResult(data?: {
	        query?: string;
	        products?: Product[];
	    }, option?: EventOption): Promise<void>;
	    /**
	     * Send ViewProductDetail-Event to server.
	     * @param [data.products] - Product-List
	     * @param [option = {}] - event custom infomation
	     */
	    viewProductDetail(data?: {
	        products?: Product[];
	    }, option?: EventOption): Promise<void>;
	    /**
	     * Send AddToCart-Event to server.
	     * @param [data.cartID] - Cart's unique identifier
	     * @param [data.products] - Product-List
	     * @param [data.currency] - currency in <a href='https://en.wikipedia.org/wiki/ISO_4217'>ISO 4217<a/>
	     * @param [data.total] - Total price of products in cart
	     * @param [option = {}] - event custom infomation
	     */
	    addToCart(data?: {
	        cartID?: string;
	        products?: Product[];
	        currency?: string;
	        total?: number;
	    }, option?: EventOption): Promise<void>;
	    /**
	     * Send Purchase-Event to server.
	     * @param [data.transactionID] - Transaction's unique identifier
	     * @param [data.products] - Product-List
	     * @param [data.isInAppPurchase] - is in-app purchased
	     * @param [data.currency] - currency in <a href='https://en.wikipedia.org/wiki/ISO_4217'>ISO 4217<a/>
	     * @param [data.total] - Total price of products in cart
	     * @param [option = {}] - event custom infomation
	     */
	    purchase(data?: {
	        transactionID?: string;
	        products?: Product[];
	        isInAppPurchase?: boolean;
	        currency?: string;
	        total?: number;
	    }, option?: EventOption): Promise<void>;
	    /**
	     * Send Goal-Event to server.
	     * @param category - event name
	     * @param [option = {}] - event custom infomation
	     */
	    custom(category: string, option?: EventOption): Promise<void>;
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
	 * @property [option.action] - event group name 1
	 * @property [option.label] - event group name 2
	 * @property [option.value] - event custom value
	 * @property [option.attributes] - event custom attributes
	 * @property [option.semantics] - event semantic attributes
	 */
	type EventOption = {};
	
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
	 */
	type User = {
	    ID?: string;
	    email?: string;
	    phone?: string;
	};
	
	const airbridge: Airbridge;

	export default airbridge;
}