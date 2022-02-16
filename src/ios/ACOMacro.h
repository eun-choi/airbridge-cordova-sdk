//
//  ACOMacro.h
//  AirbridgeCO
//
//  Created by WOF on 10/05/2019.
//  Copyright © 2019 ab180. All rights reserved.
//

#import <Cordova/CDV.h>

#define cordovaSuccess(PLUGIN, COMMAND) \
CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];\
[(PLUGIN).commandDelegate sendPluginResult:result callbackId:(COMMAND).callbackId]

#define cordovaFail(PLUGIN, COMMAND, MESSAGE) \
CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:(MESSAGE)];\
[(PLUGIN).commandDelegate sendPluginResult:result callbackId:(COMMAND).callbackId]