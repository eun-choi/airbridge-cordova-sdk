//
//  AirbridgePlacement.h
//  HelloCordova
//
//  Created by WOF on 16/08/2019.
//

#import <Cordova/CDV.h>

NS_ASSUME_NONNULL_BEGIN

@interface AirbridgePlacement : CDVPlugin

// cordova method
- (void)click:(CDVInvokedUrlCommand*)command;
- (void)impression:(CDVInvokedUrlCommand*)command;

@end

NS_ASSUME_NONNULL_END
