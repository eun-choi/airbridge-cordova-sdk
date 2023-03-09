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
- (void)trackEvent:(CDVInvokedUrlCommand*)command;

@end

NS_ASSUME_NONNULL_END
