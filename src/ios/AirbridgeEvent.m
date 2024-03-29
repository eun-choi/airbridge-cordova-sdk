//
//  AirbridgeEvent.m
//  AirbridgeCO
//
//  Created by WOF on 10/05/2019.
//  Copyright © 2019 ab180. All rights reserved.
//

#import "AirbridgeEvent.h"

#import "ACOMacro.h"

// Airbridge
#import <AirBridge/AirBridge.h>
#import <AirBridge/ABInAppEvent.h>
#import <AirBridge/ABCategory.h>

// AB
#import "ACOGet.h"

@implementation AirbridgeEvent

//
// cordova method
//

/**
 * send event
 * <p>
 *
 * @param       command
 *                  CDVInvokedUrlCommand
 */
- (void)trackEvent:(CDVInvokedUrlCommand*)command {
    NSString* category = [ACOGet type:NSString.class array:command.arguments index:0];
    if (category == nil) {
        NSLog(@"[Airbridge CO iOS] fail to send custom event - category not found");
        cordovaFail(self, command, @"category not found");
        return;
    }
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:1];

    ABInAppEvent* event = [[ABInAppEvent alloc] init];

    addOptionToEvent(event, option);
    [event setCategory:category];
    
    [event send];

    cordovaSuccess(self, command);
}

//
// private - tool
//

/**
 * Add option infomation to event
 * @discussion  add nil when some data has unmatch type
 * @param       event
 *                  target event
 * @param       option
 *                  dictionary which has option infomation
 */
static void addOptionToEvent(ABInAppEvent* event, NSDictionary* __nullable option) {
    if (option == nil) return;
    
    NSString* action = [ACOGet type:NSString.class dictionary:option key:@"action"];
    NSString* label = [ACOGet type:NSString.class dictionary:option key:@"label"];
    NSNumber* value = [ACOGet type:NSNumber.class dictionary:option key:@"value"];
    NSDictionary* attributes = [ACOGet type:NSDictionary.class dictionary:option key:@"customAttributes"];
    NSDictionary* semantics = [ACOGet type:NSDictionary.class dictionary:option key:@"semanticAttributes"];
    
    [event setAction:action];
    [event setLabel:label];
    [event setValue:value];
    [event setCustoms:attributes];
    [event setSemantics:semantics];
}

@end
