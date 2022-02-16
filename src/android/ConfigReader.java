package co.ab180.airbridge.cordova;

import android.app.Application;
import android.content.res.AssetManager;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import co.ab180.airbridge.AirbridgeConfig;

class ConfigReader {
    private ConfigReader() {}

    static AirbridgeConfig build(Application application, String appName, String appToken) {
        AirbridgeConfig.Builder configBuilder = new AirbridgeConfig.Builder(appName, appToken);

        JSONObject configObject = null;
        AssetManager assetManager = application.getAssets();
        try {
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(
                            assetManager.open("airbridge.json")
                    )
            );

            StringBuilder builder = new StringBuilder();

            String line = reader.readLine();
            while (line != null) {
                builder.append(line);
                line = reader.readLine();
            }

            configObject = new JSONObject(builder.toString());
        } catch (IOException ignored) {
            // when do not use airbridge.json file
        } catch (JSONException e) {
            Log.w("AirbridgeCO", "airbridge.json is not json format");
        }

        Number sessionTimeoutSeconds = Get.type(Number.class, configObject, "sessionTimeoutSeconds");
        if (sessionTimeoutSeconds != null) {
            configBuilder.setSessionTimeoutSeconds(sessionTimeoutSeconds.longValue());
        }

        Boolean autoStartTrackingEnabled = Get.type(Boolean.class, configObject, "autoStartTrackingEnabled");
        if (autoStartTrackingEnabled != null) {
            configBuilder.setAutoStartTrackingEnabled(autoStartTrackingEnabled);
        }

        Boolean userInfoHashEnabled = Get.type(Boolean.class, configObject, "userInfoHashEnabled");
        if (userInfoHashEnabled != null) {
            configBuilder.setUserInfoHashEnabled(userInfoHashEnabled);
        }

        Boolean trackAirbridgeLinkOnly = Get.type(Boolean.class, configObject, "trackAirbridgeLinkOnly");
        if (trackAirbridgeLinkOnly != null) {
            configBuilder.setTrackAirbridgeLinkOnly(trackAirbridgeLinkOnly);
        }

        Boolean locationCollectionEnabled = Get.type(Boolean.class, configObject, "locationCollectionEnabled");
        if (locationCollectionEnabled != null) {
            configBuilder.setLocationCollectionEnabled(locationCollectionEnabled);
        }

        Boolean facebookDeferredAppLinkEnabled = Get.type(Boolean.class, configObject, "facebookDeferredAppLinkEnabled");
        if (facebookDeferredAppLinkEnabled != null) {
            configBuilder.setFacebookDeferredAppLinkEnabled(facebookDeferredAppLinkEnabled);
        }

        configBuilder.setPlatform("cordova");
        
        return configBuilder.build();
    }
}
