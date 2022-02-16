//
//  AirbridgeDeeplink.m
//  AirbridgeCO
//
//  Created by WOF on 10/05/2019.
//  Copyright © 2019 ab180. All rights reserved.
//

#import "AirbridgeDeeplink.h"

// Airbridge
#import <AirBridge/AirBridge.h>

@implementation AirbridgeDeeplink

static NSString* initialDeeplink;

+ (void) setInitialDeeplinkCallback {
    [AirBridge.deeplink setDeeplinkCallback:^(NSString* deeplink) {
        initialDeeplink = deeplink;
    }];
}

//
// cordova method
//

- (void)listen:(CDVInvokedUrlCommand*)command {
    __block AirbridgeDeeplink* _self = self;

    if (initialDeeplink != nil) {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:initialDeeplink];
        [result setKeepCallbackAsBool:YES];

        [_self.commandDelegate sendPluginResult:result callbackId:command.callbackId];

        initialDeeplink = nil;
    }

    [AirBridge.deeplink setDeeplinkCallback:^(NSString* deeplink) {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:deeplink];
        [result setKeepCallbackAsBool:YES];

        [_self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

@end
