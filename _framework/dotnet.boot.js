export const config = /*json-start*/{
  "mainAssemblyName": "TriDB.Wasm.dll",
  "resources": {
    "hash": "sha256-yRuJGMv+LVJjnP9G/u80jCD1rarDqE4fQhb1DUAaXho=",
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
        "integrity": "sha256-hgoKw/p+nDzhO+WbIrXD8WFuxbHS6eNrc+gv8H4ydOE="
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
        "integrity": "sha256-ld1HWSv8iDAgtKvfhkSsGhbQCKXSnPVZGKhNzUC90aU="
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.wasm",
        "integrity": "sha256-ANX7uQDJl8ktp4RInLwB571v3MIS5PE0CarVwrOX6dU="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.wasm",
        "integrity": "sha256-/ly557Ve9i7Fp8aPSOISQjtfy9BfAxymD2Oyw5YsT8w="
      },
      {
        "virtualPath": "TriDB.Core.wasm",
        "name": "TriDB.Core.wasm",
        "integrity": "sha256-GWy3/qW2YfXJZ6tiCSZ7AFtuwho1QLq1kudUDhvRK5w="
      },
      {
        "virtualPath": "TriDB.Distance.wasm",
        "name": "TriDB.Distance.wasm",
        "integrity": "sha256-1uL0XvCl8Iq8TGYR/vNWSpN1Te/0gNbFvThmPmBp6cI="
      },
      {
        "virtualPath": "TriDB.Engine.wasm",
        "name": "TriDB.Engine.wasm",
        "integrity": "sha256-kzK0JGgKeRIhnX2WOpfC1TnKDVCvqLR/7d0xLHtiOCQ="
      },
      {
        "virtualPath": "TriDB.Indexes.wasm",
        "name": "TriDB.Indexes.wasm",
        "integrity": "sha256-1xs8vjvZ5+6To8gvSlYtxaHXdQjOnU3b5KCDQSN9+rk="
      },
      {
        "virtualPath": "TriDB.Language.wasm",
        "name": "TriDB.Language.wasm",
        "integrity": "sha256-GyftShoqe3UcilauJGwuR3nlpumpJm49/GVgkRddYDY="
      },
      {
        "virtualPath": "TriDB.LanguageService.wasm",
        "name": "TriDB.LanguageService.wasm",
        "integrity": "sha256-PLOVzVNq54Zw1cO+JvP/7YieUwNDeNMfytvOUJptVQ4="
      },
      {
        "virtualPath": "TriDB.Query.wasm",
        "name": "TriDB.Query.wasm",
        "integrity": "sha256-TAibCSsBLXeykEg18ohTQ4phj5LyFFlCoX8DtydbRdU="
      },
      {
        "virtualPath": "TriDB.Schema.wasm",
        "name": "TriDB.Schema.wasm",
        "integrity": "sha256-/MyieEBGuGJOlhhLXTOCQp5o1wdE3iGfQx8nYyy/MeY="
      },
      {
        "virtualPath": "TriDB.Storage.wasm",
        "name": "TriDB.Storage.wasm",
        "integrity": "sha256-gfRW4FEylAZBE1JcpS9vNKnKGJGsfJiJtL4YiJSDfZE="
      },
      {
        "virtualPath": "TriDB.Wasm.wasm",
        "name": "TriDB.Wasm.wasm",
        "integrity": "sha256-80qJIY4GMYmmwUA21uVWImtkJw9qwpXwcJoTVW67nKU="
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