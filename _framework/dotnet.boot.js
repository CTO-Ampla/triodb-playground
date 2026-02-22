export const config = /*json-start*/{
  "mainAssemblyName": "TriDB.Wasm.dll",
  "resources": {
    "hash": "sha256-9IaKvfqEufBhFvLrXLq43gjlEftPuG3V0MqZDv50U7U=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.wasm",
        "integrity": "sha256-IlPWYJYUyPKlOBtwVgHYqNpGBlMMGCTV17V2LSJF0ek="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.wasm",
        "integrity": "sha256-RL+0k9bzD6erWCNd1if+KbEwG3Prk1SN9IquINDVgFw="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.wasm",
        "integrity": "sha256-KhKcYkTLGznhv/BsbbdvX/vIxl7UxuoZ61BjnSMa1ig="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.wasm",
        "integrity": "sha256-WrtueNOgpXkAMsbgZ0CYpGE6sLq064wXmAFeXfj/xao="
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.wasm",
        "integrity": "sha256-2a7E5oUtEge6kjtWEYwoscJFhym+Pk90LCjyvczvIwA="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.wasm",
        "integrity": "sha256-/ly557Ve9i7Fp8aPSOISQjtfy9BfAxymD2Oyw5YsT8w="
      },
      {
        "virtualPath": "TriDB.Core.wasm",
        "name": "TriDB.Core.wasm",
        "integrity": "sha256-Ow0zwODrJkQOYdYfzzwlwqeZlQ0Fd9nUYyzsI0cMkKw="
      },
      {
        "virtualPath": "TriDB.Distance.wasm",
        "name": "TriDB.Distance.wasm",
        "integrity": "sha256-//Zuy6Di0TxrN+NBwCoqACifHMVWe1uJ24mX4nd8170="
      },
      {
        "virtualPath": "TriDB.Engine.wasm",
        "name": "TriDB.Engine.wasm",
        "integrity": "sha256-Au7eXiutbuE2OY6wKMjjhEUNx9mBF7h5CMjEXfEwVy8="
      },
      {
        "virtualPath": "TriDB.Indexes.wasm",
        "name": "TriDB.Indexes.wasm",
        "integrity": "sha256-WlTagGn1iZWfsWlpWBKYdD5o4/tApqKZazJ0OouS6is="
      },
      {
        "virtualPath": "TriDB.Language.wasm",
        "name": "TriDB.Language.wasm",
        "integrity": "sha256-2p6k1QOoxHloXJOsY9ud87MTQ2DlJBeCiKQeoizFwHw="
      },
      {
        "virtualPath": "TriDB.LanguageService.wasm",
        "name": "TriDB.LanguageService.wasm",
        "integrity": "sha256-m0dbJSwBPWY9AAohnpm0waeh9GJ0kLJ9OQMeI2XhWpY="
      },
      {
        "virtualPath": "TriDB.Query.wasm",
        "name": "TriDB.Query.wasm",
        "integrity": "sha256-tcB89qoCtv+xOVBEmUwRDfcG3pjECJ/bf1WD2AwS3nQ="
      },
      {
        "virtualPath": "TriDB.Schema.wasm",
        "name": "TriDB.Schema.wasm",
        "integrity": "sha256-YPcBGoSLRFpS597w2oAVz2hTnFQX4Af8DpQuxTlpvWA="
      },
      {
        "virtualPath": "TriDB.Storage.wasm",
        "name": "TriDB.Storage.wasm",
        "integrity": "sha256-JJzS1l50PS5+qMiSc9PNKfQ4Qa1suru7ZRSa0gKsXAk="
      },
      {
        "virtualPath": "TriDB.Wasm.wasm",
        "name": "TriDB.Wasm.wasm",
        "integrity": "sha256-XMSk+khgDtDylp4r7tf/a7hE321SMGh0xeUOLNU/ylc="
      },
      {
        "virtualPath": "aot-instances.wasm",
        "name": "aot-instances.wasm",
        "integrity": "sha256-ZKYH8qGQXmng3POhMUcorr9bMYF+uQANtiduldY9GFo="
      }
    ],
    "assembly": []
  },
  "debugLevel": 0,
  "globalizationMode": "invariant",
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.Globalization.Invariant": true,
        "System.TimeZoneInfo.Invariant": false,
        "System.Globalization.PredefinedCulturesOnly": true,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": false,
        "System.Threading.Thread.EnableAutoreleasePool": false
      }
    }
  }
}/*json-end*/;