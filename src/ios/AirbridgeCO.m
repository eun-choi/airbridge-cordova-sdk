//
//  AirbridgeCO.m
//  AirbridgeCO
//
//  Created by WOF on 10/05/2019.
//  Copyright © 2019 ab180. All rights reserved.
//

#import "AirbridgeCO.h"

#import "AirbridgeDeeplink.h"

// Airbridge
#import <AirBridge/AirBridge.h>

#import "ACOConfigReader.h"

@implementation AirbridgeCO

static AirbridgeCO* instance;

//
// init
//

+ (nullable AirbridgeCO*)instance {
    return instance;
}

+ (AirbridgeCO*)getInstance:(NSString*)appToken appName:(NSString*)appName withLaunchOptions:(nullable NSDictionary*)launchOptions {
    [ACOConfigReader apply];

    [AirBridge getInstance:appToken appName:appName withLaunchOptions:launchOptions];
    [AirbridgeDeeplink setInitialDeeplinkCallback];
    
    if (instance != nil) {
        instance = [[AirbridgeCO alloc] init];
    }
    
    return instance;
}

//
// interface
//

+ (ABState*)state {
    return AirBridge.state;
}

+ (ABDeeplink*)deeplink {
    return AirBridge.deeplink;
}

@end
