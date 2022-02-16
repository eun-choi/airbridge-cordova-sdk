//
//  AirbridgeEvent.h
//  AirbridgeCO
//
//  Created by WOF on 10/05/2019.
//  Copyright © 2019 ab180. All rights reserved.
//

#import <Cordova/CDV.h>

NS_ASSUME_NONNULL_BEGIN

@interface AirbridgeEvent : CDVPlugin

// cordova method
- (void)signIn:(CDVInvokedUrlCommand*)command;
- (void)signUp:(CDVInvokedUrlCommand*)command;
- (void)signOut:(CDVInvokedUrlCommand*)command;
- (void)viewHome:(CDVInvokedUrlCommand*)command;
- (void)viewProductList:(CDVInvokedUrlCommand*)command;
- (void)viewSearchResult:(CDVInvokedUrlCommand*)command;
- (void)viewProductDetail:(CDVInvokedUrlCommand*)command;
- (void)addToCart:(CDVInvokedUrlCommand*)command;
- (void)purchase:(CDVInvokedUrlCommand*)command;
- (void)custom:(CDVInvokedUrlCommand*)command;

@end

NS_ASSUME_NONNULL_END
