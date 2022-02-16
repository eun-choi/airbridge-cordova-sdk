package co.ab180.airbridge.cordova;

import android.app.Application;
import android.content.Intent;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import co.ab180.airbridge.Airbridge;

public class AirbridgeCO {

    //
    // init
    //

    /**
     * Initialize Airbridge SDK
     * <p>
     * You should call this method on MainApplication#onCreate
     * 
     * @param   application
     *              application from MainApplication#onCreate
     * @param   appName
     *              App Name in English
     * @param   appToken
     *              App Token
     */
    public static void init(@Nonnull final Application application,
                            @Nonnull String appName, 
                            @Nonnull String appToken) 
    {
        Airbridge.init(application, ConfigReader.build(application, appName, appToken));
    }

    //
    // deeplink
    //

    /**
     * You can give deeplink information to Airbridge SDK with this method
     *
     * @param   intent
     *              intent from MainActivity#onResume
     */
    public static void processDeeplinkData(final Intent intent) {
        AirbridgeDeeplink.processDeeplinkData(intent);
    }
}
