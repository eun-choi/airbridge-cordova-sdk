//
//  ACOGet.m
//  AirbridgeCO
//
//  Created by WOF on 17/10/2019.
//

#import "ACOGet.h"

@implementation ACOGet

+ (nullable id) type:(Class)type object:(nullable id)object {
    if (object == nil || [object isKindOfClass:type]) {
        return object;
    } else {
        return nil;
    }
}

+ (nullable id) type:(Class)type dictionary:(nullable NSDictionary*)dictionary key:(NSString*)key {
    if (dictionary == nil) {
        return nil;
    }
    
    NSObject* object = dictionary[key];
    
    return [ACOGet type:type object:object];
}

+ (nullable id) type:(Class)type array:(nullable NSArray*)array index:(int)index {
    if (array == nil || index < 0 || index > array.count) {
        return nil;
    }
    
    NSObject* object = array[index];
    
    return [ACOGet type:type object:object];
}

@end
