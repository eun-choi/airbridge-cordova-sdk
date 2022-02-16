//
//  ACOConfigReader.m
//  AirbridgeCO
//
//  Created by WOF on 2020/06/24.
//  Copyright © 2020 ab180. All rights reserved.
//

#import "ACOConfigReader.h"

#import "ACOGet.h"

#import <AirBridge/AirBridge.h>

@implementation ACOConfigReader

+ (void) apply {
    NSString* path = [NSBundle.mainBundle pathForResource:@"airbridge" ofType:@"json"];
    NSData* data = [NSData dataWithContentsOfFile:path];
    NSDictionary* json = nil;
    if (data != nil) {
        json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    }
    
    NSNumber* sessionTimeoutSeconds = [ACOGet type:NSNumber.class dictionary:json key:@"sessionTimeoutSeconds"];
    if (sessionTimeoutSeconds != nil) {
        [AirBridge setSessionTimeout:sessionTimeoutSeconds.intValue * 1000];
    }
    
    NSNumber* autoStartTrackingEnabled = [ACOGet type:NSNumber.class dictionary:json key:@"autoStartTrackingEnabled"];
    if (autoStartTrackingEnabled != nil) {
        [AirBridge setAutoStartTrackingEnabled:autoStartTrackingEnabled.boolValue];
    }
    
    NSNumber* userInfoHashEnabled = [ACOGet type:NSNumber.class dictionary:json key:@"userInfoHashEnabled"];
    if (userInfoHashEnabled != nil) {
        [AirBridge setIsUserInfoHashed:userInfoHashEnabled.boolValue];
    }
    
    NSNumber* trackAirbridgeLinkOnly = [ACOGet type:NSNumber.class dictionary:json key:@"trackAirbridgeLinkOnly"];
    if (trackAirbridgeLinkOnly != nil) {
        [AirBridge setIsTrackAirbridgeDeeplinkOnly:trackAirbridgeLinkOnly.boolValue];
    }
    
    NSNumber* facebookDeferredAppLinkEnabled = [ACOGet type:NSNumber.class dictionary:json key:@"facebookDeferredAppLinkEnabled"];
    if (facebookDeferredAppLinkEnabled != nil) {
        [AirBridge setIsFacebookDeferredAppLinkEnabled:facebookDeferredAppLinkEnabled.boolValue];
    }

    NSNumber* trackingAuthorizeTimeoutSeconds = [ACOGet type:NSNumber.class dictionary:json key:@"trackingAuthorizeTimeoutSeconds"];
    if (trackingAuthorizeTimeoutSeconds != nil) {
        AirBridge.setting.trackingAuthorizeTimeout = trackingAuthorizeTimeoutSeconds.unsignedLongLongValue * 1000;
    }
    
    [AirBridge.state setSDKDevelopmentPlatform:@"cordova"];
}

@end
