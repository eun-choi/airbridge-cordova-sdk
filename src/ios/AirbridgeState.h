//
//  AirbridgeState.h
//  AirbridgeCO
//
//  Created by WOF on 10/05/2019.
//  Copyright © 2019 ab180. All rights reserved.
//

#import <Cordova/CDV.h>

NS_ASSUME_NONNULL_BEGIN

@interface AirbridgeState : CDVPlugin

// cordova method
- (void)setUser:(CDVInvokedUrlCommand*)command;
- (void)updateUser:(CDVInvokedUrlCommand*)command;
- (void)startTracking:(CDVInvokedUrlCommand*)command;

@end

NS_ASSUME_NONNULL_END
