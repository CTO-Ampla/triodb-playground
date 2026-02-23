export const config = /*json-start*/{
  "mainAssemblyName": "TriDB.Wasm.dll",
  "resources": {
    "hash": "sha256-cSZRWdYCcZp1GSZmvavRpDzsN0BeRStq+xqlMqS7jbU=",
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
        "integrity": "sha256-fYxwbrLZuQSoyAuuzkcJJGxWY0oXqtb7FaqfN0H88M4="
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
        "integrity": "sha256-W4DbnhZhCc8u3uG2oC1dekCknoHGgXoEvMWzU/QQulE="
      },
      {
        "virtualPath": "TriDB.Distance.wasm",
        "name": "TriDB.Distance.wasm",
        "integrity": "sha256-s1iV1yrYPp8UpzSu9uxBvw4HTwP3n2cRsXkeB3BzKU0="
      },
      {
        "virtualPath": "TriDB.Engine.wasm",
        "name": "TriDB.Engine.wasm",
        "integrity": "sha256-hWkeujxsh72kEpU1TUiR2KaDxFWxcjDLHn1Yj1x+9yc="
      },
      {
        "virtualPath": "TriDB.Indexes.wasm",
        "name": "TriDB.Indexes.wasm",
        "integrity": "sha256-pcaafpXohodQA/lNOzmpdvS5QcQPQnTkfHnrnlpimek="
      },
      {
        "virtualPath": "TriDB.Language.wasm",
        "name": "TriDB.Language.wasm",
        "integrity": "sha256-ILqBoYjU6P+rbm5Mex/PxOzWs2pGq0ShrFoa6bc2FHs="
      },
      {
        "virtualPath": "TriDB.LanguageService.wasm",
        "name": "TriDB.LanguageService.wasm",
        "integrity": "sha256-sYgMEh7H3uUOOskEhLwl3P85mgrTSJaHpu6DmOK4Brw="
      },
      {
        "virtualPath": "TriDB.Query.wasm",
        "name": "TriDB.Query.wasm",
        "integrity": "sha256-+JGhGdzYiynjD3NzCrBFK9KQ/Ae3IK8EA9rpLNpCxYI="
      },
      {
        "virtualPath": "TriDB.Schema.wasm",
        "name": "TriDB.Schema.wasm",
        "integrity": "sha256-O9RIXL87xYOijlyzA0uvFZmbG+3jiiAMh8Iemx/3dR0="
      },
      {
        "virtualPath": "TriDB.Storage.wasm",
        "name": "TriDB.Storage.wasm",
        "integrity": "sha256-BLbK/jKRYQ47X0N47HmEGablUxwr2hqlDEYx3tPGjug="
      },
      {
        "virtualPath": "TriDB.Wasm.wasm",
        "name": "TriDB.Wasm.wasm",
        "integrity": "sha256-3I7UgQrH2fTqCX10a/7tTWYKuQM3PfM8AF32Xb2MF6Q="
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