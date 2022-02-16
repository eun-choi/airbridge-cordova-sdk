//
//  AirbridgePlacement.m
//  HelloCordova
//
//  Created by WOF on 16/08/2019.
//

#import "AirbridgePlacement.h"

#import "ACOMacro.h"

// Airbridge
#import <Airbridge/AirBridge.h>
// AB
#import "ACOGet.h"

@implementation AirbridgePlacement

- (void)click:(CDVInvokedUrlCommand*)command {
    NSString* trackingLink = [ACOGet type:NSString.class array:command.arguments index:0];
    NSString* deeplink = [ACOGet type:NSString.class array:command.arguments index:1];
    NSString* fallback = [ACOGet type:NSString.class array:command.arguments index:2];
    
    if (trackingLink == nil) {
        cordovaFail(self, command, @"trackingLink is nil");
    }
    
    [AirBridge.placement click:trackingLink deeplink:deeplink fallback:fallback];
    
    cordovaSuccess(self, command);
}

- (void)impression:(CDVInvokedUrlCommand*)command {
    NSString* trackingLink = [ACOGet type:NSString.class array:command.arguments index:0];
    
    if (trackingLink == nil) {
        cordovaFail(self, command, @"trackingLink is nil");
    }
    
    [AirBridge.placement impression:trackingLink];
    
    cordovaSuccess(self, command);
}

@end
