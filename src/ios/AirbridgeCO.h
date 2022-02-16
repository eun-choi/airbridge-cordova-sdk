//
//  AirbridgeCO.h
//  AirbridgeCO
//
//  Created by WOF on 10/05/2019.
//  Copyright © 2019 ab180. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <AirBridge/ABState.h>
#import <AirBridge/ABDeeplink.h>

NS_ASSUME_NONNULL_BEGIN

@interface AirbridgeCO : NSObject

//
// init
//

/**
 * Return singleton instance of AirbridgeCO
 * @discussion  this method return nil unless initialize Airbridge SDK
 * @return      singleton instance of AirbridgeCO
 */
+ (nullable AirbridgeCO*)instance;

/**
 * Initialize Airbridge SDK and return singleton instance of AirbridgeCO
 * @discussion  You should call this method on application:didFinishLaunchingWithOptions:
 *
 *              This method just return that when singleton instance of AirbridgeCO already exist
 * @param       appToken
 *                  App Token
 * @param       appName
 *                  App Name in English
 * @param       launchOptions
 *                  Dictionary from application:didFinishLaunchingWithOptions:
 * @return      singleton instance of AirbridgeCO
 */
+ (AirbridgeCO*)getInstance:(NSString*)appToken appName:(NSString*)appName withLaunchOptions:(nullable NSDictionary*)launchOptions;

//
// interface
//

/**
 * Return singleton instance of ABState
 * @discussion  you can modify user information manually with this instance
 *
 *              this method never return nil
 * @return      singleton instance of ABState
 */
+ (ABState*)state;

/**
 * Return singleton instance of ABDeeplink
 * @discussion  you can give deeplink information to Airbridge SDK with this instance
 *
 *              this method never return nil
 * @return      singleton instance of ABDeeplink
 */
+ (ABDeeplink*)deeplink;

@end

NS_ASSUME_NONNULL_END
