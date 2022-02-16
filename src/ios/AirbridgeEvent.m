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

- (void)signIn:(CDVInvokedUrlCommand*)command {
    NSDictionary* user = [ACOGet type:NSDictionary.class array:command.arguments index:0];
    ABUser* nativeUser = convertUser(user);
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:1];
    
    [AirBridge.state setUser:nativeUser];
    
    ABInAppEvent* event = [[ABInAppEvent alloc] init];
    [event setCategory:ABCategory.signIn];
    
    addOptionToEvent(event, option);

    [event send];

    cordovaSuccess(self, command);
}

- (void)signUp:(CDVInvokedUrlCommand*)command {
    NSDictionary* user = [ACOGet type:NSDictionary.class array:command.arguments index:0];
    ABUser* nativeUser = convertUser(user);
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:1];

    [AirBridge.state setUser:nativeUser];
    
    ABInAppEvent* event = [[ABInAppEvent alloc] init];
    [event setCategory:ABCategory.signUp];
    
    addOptionToEvent(event, option);

    [event send];

    cordovaSuccess(self, command);
}

- (void)signOut:(CDVInvokedUrlCommand*)command {
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:0];

    ABInAppEvent* event = [[ABInAppEvent alloc] init];
    [event setCategory:ABCategory.signOut];

    addOptionToEvent(event, option);

    [event send];
    
    ABUser* nativeUser = nil;
    [AirBridge.state setUser:nativeUser];

    cordovaSuccess(self, command);
}

// ecommerce event
- (void)viewHome:(CDVInvokedUrlCommand*)command {
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:0];

    ABInAppEvent* event = [[ABInAppEvent alloc] init];
    [event setCategory:ABCategory.viewHome];
    
    addOptionToEvent(event, option);

    [event send];

    cordovaSuccess(self, command);
}

- (void)viewSearchResult:(CDVInvokedUrlCommand*)command {
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:0];
    
    ABInAppEvent* event = [[ABInAppEvent alloc] init];
    [event setCategory:ABCategory.viewSearchResult];
    
    addOptionToEvent(event, option);

    [event send];
    
    cordovaSuccess(self, command);
}

- (void)viewProductList:(CDVInvokedUrlCommand*)command {
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:0];
    
    ABInAppEvent* event = [[ABInAppEvent alloc] init];
    [event setCategory:ABCategory.viewProductList];
    
    addOptionToEvent(event, option);

    [event send];
    
    cordovaSuccess(self, command);
}

- (void)viewProductDetail:(CDVInvokedUrlCommand*)command {
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:0];
    
    ABInAppEvent* event = [[ABInAppEvent alloc] init];
    [event setCategory:ABCategory.viewProductDetail];
    
    addOptionToEvent(event, option);

    [event send];
    
    cordovaSuccess(self, command);
}

- (void)addToCart:(CDVInvokedUrlCommand*)command {
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:0];
    
    ABInAppEvent* event = [[ABInAppEvent alloc] init];
    [event setCategory:ABCategory.addToCart];
    
    addOptionToEvent(event, option);
  
    [event send];
    
    cordovaSuccess(self, command);
}

- (void)purchase:(CDVInvokedUrlCommand*)command {
    NSDictionary* option = [ACOGet type:NSDictionary.class array:command.arguments index:0];
    
    ABInAppEvent* event = [[ABInAppEvent alloc] init];
    [event setCategory:ABCategory.purchase];
    
    addOptionToEvent(event, option);

    [event send];
    
    cordovaSuccess(self, command);
}

- (void)custom:(CDVInvokedUrlCommand*)command {
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
    NSDictionary* attributes = [ACOGet type:NSDictionary.class dictionary:option key:@"attributes"];
    NSDictionary* semantics = [ACOGet type:NSDictionary.class dictionary:option key:@"semantics"];
    
    [event setAction:action];
    [event setLabel:label];
    [event setValue:value];
    [event setCustoms:attributes];
    [event setSemantics:semantics];
}

/**
 * Convert dictionary to ABUser
 * @discussion  return nil when user is nil
 *
 *              add nil when some data has unmatch type
 * @param       product
 *                  dictionary which has user infomation
 * @return      ABUser
 */
static ABUser* __nullable convertUser(NSDictionary* __nullable user) {
    if (user == nil) return nil;
    
    NSString* ID = [ACOGet type:NSString.class dictionary:user key:@"ID"];
    NSString* email = [ACOGet type:NSString.class dictionary:user key:@"email"];
    NSString* phone = [ACOGet type:NSString.class dictionary:user key:@"phone"];
    NSDictionary* alias = [ACOGet type:NSDictionary.class dictionary:user key:@"alias"];
    NSDictionary* attributes = [ACOGet type:NSDictionary.class dictionary:user key:@"attributes"];
    
    ABUser* nativeUser = [[ABUser alloc] init];
    nativeUser.ID = ID;
    nativeUser.email = email;
    nativeUser.phone = phone;
    nativeUser.alias = alias;
    nativeUser.attributes = attributes;
    
    return nativeUser;
}

@end
