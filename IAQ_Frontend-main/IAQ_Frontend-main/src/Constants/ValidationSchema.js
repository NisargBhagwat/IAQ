import { string, boolean, object } from "yup";
import { isValidUrl } from "./Helpers";

const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

export const updateModalSchema = object().shape({
  serialNo: string(),
  wifiSSID: string(),
  wifiPassword: string(),
});

export const updateOTASchma = object().shape(
  {
    wifiOTA: string(),
    stm32OTA: string(),
  },
  ["wifiOTA", "stm32OTA"],
  ["stm32OTA", "wifiOTA"]
);

export const wifiOtaSchema = object().shape({
  otaVersion: string().required("OtaVersion is required"),
  otaUrl: string()
    .test("is-url-valid", "Wifi OTA Should be valid Url", (value) =>
      isValidUrl(value)
    )
    .required("Wifi Ota is Required"),
  wifiStatus: boolean().test(
    "is boolean",
    "wifi Status is required",
    (value) => value === true || value === false
  ),
});

export const STM32OtaSchema = object().shape({
  otaVersion: string().required("OtaVersion is required"),
  otaUrl: string()
    .test("is-url-valid", "Wifi OTA Should be valid Url", (value) =>
      isValidUrl(value)
    )
    .required("Wifi Ota is Required"),
  otaCrc: string().required("OtaCrc is required"),
  wifiStatus: boolean().test(
    "is boolean",
    "wifi Status is required",
    (value) => value === true || value === false
  ),
});
