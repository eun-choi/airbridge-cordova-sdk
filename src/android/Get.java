package co.ab180.airbridge.cordova;

import org.json.JSONArray;
import org.json.JSONObject;

public class Get {
    static <T> T type(Class<T> type, Object object) {
        if (object == null || type.isInstance(object)) {
            return type.cast(object);
        } else {
            return null;
        }
    }

    static <T> T type(Class<T> type, JSONObject object, String key) {
        if (object == null) {
            return null;
        }

        Object value = object.opt(key);

        return Get.type(type, value);
    }

    static <T> T type(Class<T> type, JSONArray array, int index) {
        if (array == null || index < 0 || index > array.length()) {
            return null;
        }

        Object object = array.opt(index);

        return Get.type(type, object);
    }

    static <T extends Number> T type(Class<T> type, Number number) {
        if (number == null) {
            return null;
        }

        if (type.isAssignableFrom(Number.class)) {
            return type.cast(number);
        }

        if(type.isAssignableFrom(Byte.class)) {

            return type.cast(number.byteValue());

        } else if (type.isAssignableFrom(Short.class)) {

            return type.cast(number.shortValue());

        } else if (type.isAssignableFrom(Integer.class)) {

            return type.cast(number.intValue());

        } else if (type.isAssignableFrom(Long.class)) {

            return type.cast(number.longValue());

        } else if (type.isAssignableFrom(Float.class)) {

            return type.cast(number.floatValue());

        } else if (type.isAssignableFrom(Double.class)) {

            return type.cast(number.doubleValue());

        }

        return null;
    }
}
