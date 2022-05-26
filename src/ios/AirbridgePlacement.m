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
    
    if (trackingLink == nil) {
        cordovaFail(self, command, @"trackingLink is nil");
    }

    NSURL* url = [NSURL URLWithString:trackingLink];
    if (url == nil) {
        cordovaFail(self, command, @"trackingLink is not url form");
    }
    
    [AirBridge.placement click:url];
    
    cordovaSuccess(self, command);
}

- (void)impression:(CDVInvokedUrlCommand*)command {
    NSString* trackingLink = [ACOGet type:NSString.class array:command.arguments index:0];
    
    if (trackingLink == nil) {
        cordovaFail(self, command, @"trackingLink is nil");
    }

    NSURL* url = [NSURL URLWithString:trackingLink];
    if (url == nil) {
        cordovaFail(self, command, @"trackingLink is not url form");
    }
    
    [AirBridge.placement impression:url];
    
    cordovaSuccess(self, command);
}

@end
