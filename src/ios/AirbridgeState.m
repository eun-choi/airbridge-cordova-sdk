//
//  AirbridgeState.m
//  AirbridgeCO
//
//  Created by WOF on 10/05/2019.
//  Copyright © 2019 ab180. All rights reserved.
//

#import "AirbridgeState.h"

#import "ACOMacro.h"

// Airbridge
#import <AirBridge/AirBridge.h>
// AB
#import "ACOGet.h"

@implementation AirbridgeState

//
// cordova method
//

- (void)setUser:(CDVInvokedUrlCommand*)command {
    NSDictionary* user = [ACOGet type:NSDictionary.class array:command.arguments index:0];

    NSString* ID = [ACOGet type:NSString.class dictionary:user key:@"ID"];
    NSString* email = [ACOGet type:NSString.class dictionary:user key:@"email"];
    NSString* phone = [ACOGet type:NSString.class dictionary:user key:@"phone"];
    NSDictionary* alias = [ACOGet type:NSDictionary.class dictionary:user key:@"alias"];
    NSDictionary* attributes = [ACOGet type:NSDictionary.class dictionary:user key:@"attributes"];
    
    [AirBridge.state setUserID:ID];
    [AirBridge.state setUserEmail:email];
    [AirBridge.state setUserPhone:phone];
    [AirBridge.state setUserAlias:alias];
    [AirBridge.state setUserAttributes:attributes];

    cordovaSuccess(self, command);
}

- (void)updateUser:(CDVInvokedUrlCommand*)command {
    NSDictionary* user = [ACOGet type:NSDictionary.class array:command.arguments index:0];

    NSString* ID = [ACOGet type:NSString.class dictionary:user key:@"ID"];
    NSString* email = [ACOGet type:NSString.class dictionary:user key:@"email"];
    NSString* phone = [ACOGet type:NSString.class dictionary:user key:@"phone"];
    NSDictionary* alias = [ACOGet type:NSDictionary.class dictionary:user key:@"alias"];
    NSDictionary* attributes = [ACOGet type:NSDictionary.class dictionary:user key:@"attributes"];
    
    if (ID != nil) {
        [AirBridge.state setUserID:ID];
    }
    if (email != nil) {
        [AirBridge.state setUserEmail:email];
    }
    if (phone != nil) {
        [AirBridge.state setUserPhone:phone];
    }
    if (!alias) {
        [AirBridge.state setUserAlias:alias];
    }
    if (!attributes) {
        [AirBridge.state setUserAttributes:attributes];
    }

    cordovaSuccess(self, command);
}

- (void)startTracking:(CDVInvokedUrlCommand*)command {
    [AirBridge startTracking];
}

@end
