# AventusSharp@Main

## Overview

| Nom | Type | Description |
| --- | --- | --- |
| [AventusSharp.Data.CustomTableMembers.AventusFile](aventussharp.data.customtablemembers.aventusfile) | Class |  |
| [AventusSharp.Data.CustomTableMembers.AventusImage](aventussharp.data.customtablemembers.aventusimage) | Class |  |
| [AventusSharp.Data.CustomTableMembers.ImageFileError](aventussharp.data.customtablemembers.imagefileerror) | Class |  |
| [AventusSharp.Data.CustomTableMembers.ResultWithImageFileError](aventussharp.data.customtablemembers.resultwithimagefileerror) | Class |  |
| [AventusSharp.Data.CustomTableMembers.VoidWithImageFileError](aventussharp.data.customtablemembers.voidwithimagefileerror) | Class |  |
| [AventusSharp.Data.DataError](aventussharp.data.dataerror) | Class |  |
| [AventusSharp.Data.FieldErrorInfo](aventussharp.data.fielderrorinfo) | Class |  |
| [AventusSharp.Data.ResultWithDataError](aventussharp.data.resultwithdataerror) | Class |  |
| [AventusSharp.Data.SharpClass](aventussharp.data.sharpclass) | Class |  |
| [AventusSharp.Data.Storable](aventussharp.data.storable) | Class |  |
| [AventusSharp.Data.StorableTimestamp](aventussharp.data.storabletimestamp) | Class |  |
| [AventusSharp.Data.VoidWithDataError](aventussharp.data.voidwithdataerror) | Class |  |
| [AventusSharp.Maui](aventussharp.maui) | Class |  |
| [AventusSharp.RAM.RamCompletor](aventussharp.ram.ramcompletor) | Class |  |
| [AventusSharp.RAM.RamHttp](aventussharp.ram.ramhttp) | Class |  |
| [AventusSharp.RAM.RamWebSocket](aventussharp.ram.ramwebsocket) | Class |  |
| [AventusSharp.Routes.Request.Request](aventussharp.routes.request.request) | Class |  |
| [AventusSharp.Routes.Response.Resource](aventussharp.routes.response.resource) | Class |  |
| [AventusSharp.Routes.ResultWithRouteError](aventussharp.routes.resultwithrouteerror) | Class |  |
| [AventusSharp.Routes.RouteError](aventussharp.routes.routeerror) | Class |  |
| [AventusSharp.Routes.StorableRouter](aventussharp.routes.storablerouter) | Class |  |
| [AventusSharp.Routes.VoidWithRouteError](aventussharp.routes.voidwithrouteerror) | Class |  |
| [AventusSharp.SSE.ResultWithSSEError](aventussharp.sse.resultwithsseerror) | Class |  |
| [AventusSharp.SSE.SSEError](aventussharp.sse.sseerror) | Class |  |
| [AventusSharp.SSE.VoidWithSSEError](aventussharp.sse.voidwithsseerror) | Class |  |
| [AventusSharp.Tools.ResultWithError](aventussharp.tools.resultwitherror) | Class |  |
| [AventusSharp.Tools.VoidWithError](aventussharp.tools.voidwitherror) | Class |  |
| [AventusSharp.WebSocket.Connection](aventussharp.websocket.connection) | Class |  |
| [AventusSharp.WebSocket.EndPoint](aventussharp.websocket.endpoint) | Class |  |
| [AventusSharp.WebSocket.ResultWithWsError](aventussharp.websocket.resultwithwserror) | Class |  |
| [AventusSharp.WebSocket.Router](aventussharp.websocket.router) | Class |  |
| [AventusSharp.WebSocket.Socket](aventussharp.websocket.socket) | Class |  |
| [AventusSharp.WebSocket.SocketError](aventussharp.websocket.socketerror) | Class |  |
| [AventusSharp.WebSocket.StorableWsRoute_CreateMany](aventussharp.websocket.storablewsroute_createmany) | Class |  |
| [AventusSharp.WebSocket.StorableWsRoute_DeleteMany](aventussharp.websocket.storablewsroute_deletemany) | Class |  |
| [AventusSharp.WebSocket.StorableWsRoute_UpdateMany](aventussharp.websocket.storablewsroute_updatemany) | Class |  |
| [AventusSharp.WebSocket.StorableWsRouter](aventussharp.websocket.storablewsrouter) | Class |  |
| [AventusSharp.WebSocket.StorableWsRouter_Create](aventussharp.websocket.storablewsrouter_create) | Class |  |
| [AventusSharp.WebSocket.StorableWsRouter_Delete](aventussharp.websocket.storablewsrouter_delete) | Class |  |
| [AventusSharp.WebSocket.StorableWsRouter_GetAll](aventussharp.websocket.storablewsrouter_getall) | Class |  |
| [AventusSharp.WebSocket.StorableWsRouter_GetById](aventussharp.websocket.storablewsrouter_getbyid) | Class |  |
| [AventusSharp.WebSocket.StorableWsRouter_GetByIds](aventussharp.websocket.storablewsrouter_getbyids) | Class |  |
| [AventusSharp.WebSocket.StorableWsRouter_Update](aventussharp.websocket.storablewsrouter_update) | Class |  |
| [AventusSharp.WebSocket.VoidWithWsError](aventussharp.websocket.voidwithwserror) | Class |  |
| [AventusSharp.WebSocket.WsError](aventussharp.websocket.wserror) | Class |  |
| [AventusSharp.WebSocket.WsEvent](aventussharp.websocket.wsevent) | Class |  |

## AventusSharp.Data.CustomTableMembers.AventusFile<T>

 - Type : Class
 - Import : import { AventusFile } from "AventusSharp@Main:AventusSharp.Data.CustomTableMembers.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| Uri | string |  |
| Upload | File |  |
| $type | string | Get the unique type for the data. Define it as the namespace + class name |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| toJSON() | any |  |

## AventusSharp.Data.CustomTableMembers.AventusImage<T extends Aventus.IData>

 - Type : Class
 - Import : import { AventusImage } from "AventusSharp@Main:AventusSharp.Data.CustomTableMembers.package.avt"
 - Parent : AventusSharp.Data.CustomTableMembers.AventusFile

## AventusSharp.Data.CustomTableMembers.ImageFileError

 - Type : Class
 - Import : import { ImageFileError } from "AventusSharp@Main:AventusSharp.Data.CustomTableMembers.package.avt"
 - Parent : Aventus.GenericError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Data.CustomTableMembers.ResultWithImageFileError<T>

 - Type : Class
 - Import : import { ResultWithImageFileError } from "AventusSharp@Main:AventusSharp.Data.CustomTableMembers.package.avt"
 - Parent : AventusSharp.Tools.ResultWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Data.CustomTableMembers.VoidWithImageFileError

 - Type : Class
 - Import : import { VoidWithImageFileError } from "AventusSharp@Main:AventusSharp.Data.CustomTableMembers.package.avt"
 - Parent : AventusSharp.Tools.VoidWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Data.DataError

 - Type : Class
 - Import : import { DataError } from "AventusSharp@Main:AventusSharp.Data.package.avt"
 - Parent : Aventus.GenericError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Data.FieldErrorInfo

 - Type : Class
 - Import : import { FieldErrorInfo } from "AventusSharp@Main:AventusSharp.Data.package.avt"
 - Parent : AventusSharp.Data.SharpClass

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| Name | string |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Data.ResultWithDataError<T>

 - Type : Class
 - Import : import { ResultWithDataError } from "AventusSharp@Main:AventusSharp.Data.package.avt"
 - Parent : AventusSharp.Tools.ResultWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Data.SharpClass

 - Type : Class
 - Import : import { SharpClass } from "AventusSharp@Main:AventusSharp.Data.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| namespace | string | The current namespace |
| $type | string | Get the unique type for the data. Define it as the namespace + class name |
| className | string | Get the name of the class |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| clone() | this | Clone the object by transforming a parsed JSON string back into the original type |
| toJSON() | any | Get a JSON for the current object |

## AventusSharp.Data.Storable

 - Type : Class
 - Import : import { Storable } from "AventusSharp@Main:AventusSharp.Data.package.avt"
 - Parent : Aventus.Data

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| Id | number |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| toJSON() | any |  |

## AventusSharp.Data.StorableTimestamp

 - Type : Class
 - Import : import { StorableTimestamp } from "AventusSharp@Main:AventusSharp.Data.package.avt"
 - Parent : AventusSharp.Data.Storable

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| CreatedDate | Aventus.DateTime |  |
| UpdatedDate | Aventus.DateTime |  |

## AventusSharp.Data.VoidWithDataError

 - Type : Class
 - Import : import { VoidWithDataError } from "AventusSharp@Main:AventusSharp.Data.package.avt"
 - Parent : AventusSharp.Tools.VoidWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Maui

 - Type : Class
 - Import : import { Maui } from "AventusSharp@Main:AventusSharp.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(config: Partial&lt;___AventusSharp.MauiConfig&gt;) | Promise&lt;void&gt; |  |

## AventusSharp.RAM.RamCompletor<T>

 - Type : Class
 - Import : import { RamCompletor } from "AventusSharp@Main:AventusSharp.RAM.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| add<U extends Aventus.IRamData>(field: AventusSharp.RAM.ItemField&lt;T, U&gt;) | AventusSharp.RAM.RamCompletor&lt;T&gt; |  |
| run() | Promise&lt;Aventus.VoidWithError&gt; |  |

## AventusSharp.RAM.RamHttp<Item extends AventusSharp.Data.Storable, Request extends AventusSharp.Routes.Request.Request &vert; Item = Item, ResourceSimple extends AventusSharp.Routes.Response.Resource &vert; Item = Item, ResourceDetails extends ResourceSimple = ResourceSimple>

 - Type : Class
 - Import : import { RamHttp } from "AventusSharp@Main:AventusSharp.RAM.package.avt"
 - Parent : Aventus.Ram

### Methods

| Name | Return | Description |
| --- | --- | --- |
| defineRoutes() | AventusSharp.Routes.StorableRouter&lt;Item, Request, ResourceSimple, ResourceDetails&gt; | (abstract) |
| complete(objects: ResourceDetails &vert; ResourceDetails) | AventusSharp.RAM.RamCompletor&lt;ResourceDetails&gt; |  |

## AventusSharp.RAM.RamWebSocket<Item extends AventusSharp.Data.Storable, Request extends AventusSharp.Routes.Request.Request &vert; Item = Item, ResourceSimple extends AventusSharp.Routes.Response.Resource &vert; Item = Item, ResourceDetails extends ResourceSimple = ResourceSimple>

 - Type : Class
 - Import : import { RamWebSocket } from "AventusSharp@Main:AventusSharp.RAM.package.avt"
 - Parent : Aventus.Ram

### Methods

| Name | Return | Description |
| --- | --- | --- |
| defineRoutes() | AventusSharp.WebSocket.StorableWsRouter&lt;Item, Request, ResourceSimple, ResourceDetails&gt; | (abstract) |
| complete(objects: ResourceDetails &vert; ResourceDetails) | AventusSharp.RAM.RamCompletor&lt;ResourceDetails&gt; |  |

## AventusSharp.Routes.Request.Request

 - Type : Class
 - Import : import { Request } from "AventusSharp@Main:AventusSharp.Routes.Request.package.avt"
 - Parent : AventusSharp.Data.SharpClass

## AventusSharp.Routes.Response.Resource

 - Type : Class
 - Import : import { Resource } from "AventusSharp@Main:AventusSharp.Routes.Response.package.avt"
 - Parent : AventusSharp.Data.SharpClass

### Methods

| Name | Return | Description |
| --- | --- | --- |
| toRequest<T extends AventusSharp.Routes.Request.Request>(request: new () =&gt; T()) | T |  |

## AventusSharp.Routes.ResultWithRouteError<T>

 - Type : Class
 - Import : import { ResultWithRouteError } from "AventusSharp@Main:AventusSharp.Routes.package.avt"
 - Parent : AventusSharp.Tools.ResultWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Routes.RouteError

 - Type : Class
 - Import : import { RouteError } from "AventusSharp@Main:AventusSharp.Routes.package.avt"
 - Parent : Aventus.GenericError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Routes.StorableRouter<T extends Aventus.IData, U extends AventusSharp.Routes.Request.Request &vert; T = T, R extends AventusSharp.Routes.Response.Resource &vert; T = T, S extends AventusSharp.Routes.Response.Resource &vert; T = R>

 - Type : Class
 - Import : import { StorableRouter } from "AventusSharp@Main:AventusSharp.Routes.package.avt"
 - Parent : Aventus.HttpRoute

### Methods

| Name | Return | Description |
| --- | --- | --- |
| GetAll() | Promise&lt;AventusSharp.Tools.ResultWithError&lt;R&gt;&gt; |  |
| Create(body: { item: U; }) | Promise&lt;AventusSharp.Tools.ResultWithError&lt;S&gt;&gt; |  |
| CreateMany(body: { list: U[]; }) | Promise&lt;AventusSharp.Tools.ResultWithError&lt;S&gt;&gt; |  |
| GetById(id: number) | Promise&lt;AventusSharp.Tools.ResultWithError&lt;S&gt;&gt; |  |
| GetByIds(body: { ids: number[]; }) | Promise&lt;AventusSharp.Tools.ResultWithError&lt;S&gt;&gt; |  |
| Update(id: number, body: { item: U; }) | Promise&lt;AventusSharp.Tools.ResultWithError&lt;S&gt;&gt; |  |
| UpdateMany(body: { list: U[]; }) | Promise&lt;AventusSharp.Tools.ResultWithError&lt;S&gt;&gt; |  |
| Delete(id: number) | Promise&lt;AventusSharp.Tools.ResultWithError&lt;boolean&gt;&gt; |  |
| DeleteMany(body: { ids: number[]; }) | Promise&lt;AventusSharp.Tools.ResultWithError&lt;boolean&gt;&gt; |  |
| StorableName() | string | (abstract) |

## AventusSharp.Routes.VoidWithRouteError

 - Type : Class
 - Import : import { VoidWithRouteError } from "AventusSharp@Main:AventusSharp.Routes.package.avt"
 - Parent : AventusSharp.Tools.VoidWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.SSE.ResultWithSSEError<T>

 - Type : Class
 - Import : import { ResultWithSSEError } from "AventusSharp@Main:AventusSharp.SSE.package.avt"
 - Parent : AventusSharp.Tools.ResultWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.SSE.SSEError

 - Type : Class
 - Import : import { SSEError } from "AventusSharp@Main:AventusSharp.SSE.package.avt"
 - Parent : Aventus.GenericError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.SSE.VoidWithSSEError

 - Type : Class
 - Import : import { VoidWithSSEError } from "AventusSharp@Main:AventusSharp.SSE.package.avt"
 - Parent : AventusSharp.Tools.VoidWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Tools.ResultWithError<T, U extends Aventus.GenericError = Aventus.GenericError>

 - Type : Class
 - Import : import { ResultWithError } from "AventusSharp@Main:AventusSharp.Tools.package.avt"
 - Parent : Aventus.ResultWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.Tools.VoidWithError<T extends Aventus.GenericError = Aventus.GenericError>

 - Type : Class
 - Import : import { VoidWithError } from "AventusSharp@Main:AventusSharp.Tools.package.avt"
 - Parent : Aventus.VoidWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.WebSocket.Connection

 - Type : Class
 - Import : import { Connection } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| onOpen | Aventus.Callback&lt;() =&gt; void(): void&gt; |  |
| onClose | Aventus.Callback&lt;(event: Event) =&gt; void(event: Event): void&gt; |  |
| onError | Aventus.Callback&lt;(event: Event) =&gt; void(event: Event): void&gt; |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| addRoute(newRoute: AventusSharp.WebSocket.SocketRoute) | void | Add a new route to listen to the websocket |
| removeRoute(route: AventusSharp.WebSocket.SocketRoute) | void | The route to remove |
| open() | Promise&lt;boolean&gt; | Try to open the websocket |
| sendMessage<T>(options: AventusSharp.WebSocket.SocketSendMessageOptions) | Promise&lt;Aventus.VoidWithError&gt; | Send a message though the websocket |
| sendMessageAndWait<T>(options: AventusSharp.WebSocket.SocketSendMessageOptions) | Promise&lt;Aventus.ResultWithError&lt;Aventus.ExtractFromError&lt;T&gt;&gt;&gt; | Send a message though the websocket and wait one answer give in parameters callbacks |
| isReady() | boolean | Check if socket is ready |
| close() | void | Close the current connection |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Debug | boolean |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| getInstance() | AventusSharp.WebSocket.Connection | Create a singleton |

## AventusSharp.WebSocket.EndPoint

 - Type : Class
 - Import : import { EndPoint } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.Connection

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| getInstance() | AventusSharp.WebSocket.EndPoint | Create a singleton |

## AventusSharp.WebSocket.ResultWithWsError<T>

 - Type : Class
 - Import : import { ResultWithWsError } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.Tools.ResultWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.WebSocket.Router<T extends AventusSharp.WebSocket.RouterRoutes>

 - Type : Class
 - Import : import { Router } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| endpoint | AventusSharp.WebSocket.EndPoint |  |
| events | T |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| getPrefix() | string |  |

## AventusSharp.WebSocket.Socket

 - Type : Class
 - Import : import { Socket } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| onOpen | Aventus.Callback&lt;(ev: Event) =&gt; any(ev: Event): any&gt; |  |
| onClose | Aventus.Callback&lt;(ev: Event) =&gt; any(ev: Event): any&gt; |  |
| onError | Aventus.Callback&lt;(ev: Event) =&gt; any(ev: Event): any&gt; |  |
| onMessage | Aventus.Callback&lt;(ev: MessageEvent&lt;any&gt;) =&gt; any(ev: MessageEvent&lt;any&gt;): any&gt; |  |
| readyState | number |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| close(el: any, code: number &vert; undefined, reason: string &vert; undefined) | void |  |
| send(data: BufferSource &vert; Blob &vert; string) | void |  |
| isReady() | boolean | Check if socket is ready |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Debug | boolean |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| getInstance(url: string, el: any) | AventusSharp.WebSocket.Socket |  |

## AventusSharp.WebSocket.SocketError

 - Type : Class
 - Import : import { SocketError } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : Aventus.GenericError

## AventusSharp.WebSocket.StorableWsRoute_CreateMany<T>

 - Type : Class
 - Import : import { StorableWsRoute_CreateMany } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.WsEvent

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| StorableName | () =&gt; string(): string |  |

## AventusSharp.WebSocket.StorableWsRoute_DeleteMany

 - Type : Class
 - Import : import { StorableWsRoute_DeleteMany } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.WsEvent

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| StorableName | () =&gt; string(): string |  |

## AventusSharp.WebSocket.StorableWsRoute_UpdateMany<T>

 - Type : Class
 - Import : import { StorableWsRoute_UpdateMany } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.WsEvent

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| StorableName | () =&gt; string(): string |  |

## AventusSharp.WebSocket.StorableWsRouter_Create<T>

 - Type : Class
 - Import : import { StorableWsRouter_Create } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.WsEvent

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| StorableName | () =&gt; string(): string |  |

## AventusSharp.WebSocket.StorableWsRouter_Delete

 - Type : Class
 - Import : import { StorableWsRouter_Delete } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.WsEvent

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| StorableName | () =&gt; string(): string |  |

## AventusSharp.WebSocket.StorableWsRouter_GetAll<T>

 - Type : Class
 - Import : import { StorableWsRouter_GetAll } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.WsEvent

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| StorableName | () =&gt; string(): string |  |

## AventusSharp.WebSocket.StorableWsRouter_GetById<T>

 - Type : Class
 - Import : import { StorableWsRouter_GetById } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.WsEvent

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| StorableName | () =&gt; string(): string |  |

## AventusSharp.WebSocket.StorableWsRouter_GetByIds<T>

 - Type : Class
 - Import : import { StorableWsRouter_GetByIds } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.WsEvent

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| StorableName | () =&gt; string(): string |  |

## AventusSharp.WebSocket.StorableWsRouter_Update<T>

 - Type : Class
 - Import : import { StorableWsRouter_Update } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.WsEvent

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| StorableName | () =&gt; string(): string |  |

## AventusSharp.WebSocket.StorableWsRouter<T extends Aventus.IData, U extends AventusSharp.Routes.Request.Request &vert; T = T, R extends AventusSharp.Routes.Response.Resource &vert; T = T, S extends AventusSharp.Routes.Response.Resource &vert; T = R, __Route extends AventusSharp.WebSocket.StorableWsRouter__Routes&lt;T, U, R, S&gt; = AventusSharp.WebSocket.StorableWsRouter__Routes&lt;T, U, R, S&gt;>

 - Type : Class
 - Import : import { StorableWsRouter } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.WebSocket.Router

### Methods

| Name | Return | Description |
| --- | --- | --- |
| GetAll(options: AventusSharp.WebSocket.WsRouteSendOptions) | Promise&lt;AventusSharp.ExtractResponse&lt;AventusSharp.WebSocket.StorableWsRouter_GetAll&lt;R&gt;&gt;&gt; |  |
| Create(body: { request: U; }, options: AventusSharp.WebSocket.WsRouteSendOptions) | Promise&lt;AventusSharp.ExtractResponse&lt;AventusSharp.WebSocket.StorableWsRouter_Create&lt;S&gt;&gt;&gt; |  |
| CreateMany(body: { list: U[]; }, options: AventusSharp.WebSocket.WsRouteSendOptions) | Promise&lt;AventusSharp.ExtractResponse&lt;AventusSharp.WebSocket.StorableWsRoute_CreateMany&lt;T&gt;&gt;&gt; |  |
| GetById(id: number, options: AventusSharp.WebSocket.WsRouteSendOptions) | Promise&lt;AventusSharp.ExtractResponse&lt;AventusSharp.WebSocket.StorableWsRouter_GetById&lt;S&gt;&gt;&gt; |  |
| GetByIds(body: { ids: number[]; }, options: AventusSharp.WebSocket.WsRouteSendOptions) | Promise&lt;AventusSharp.ExtractResponse&lt;AventusSharp.WebSocket.StorableWsRouter_GetByIds&lt;S&gt;&gt;&gt; |  |
| Update(id: number, body: { request: U; }, options: AventusSharp.WebSocket.WsRouteSendOptions) | Promise&lt;AventusSharp.ExtractResponse&lt;AventusSharp.WebSocket.StorableWsRouter_Update&lt;S&gt;&gt;&gt; |  |
| UpdateMany(body: { list: U[]; }, options: AventusSharp.WebSocket.WsRouteSendOptions) | Promise&lt;AventusSharp.ExtractResponse&lt;AventusSharp.WebSocket.StorableWsRoute_UpdateMany&lt;T&gt;&gt;&gt; |  |
| Delete(id: number, options: AventusSharp.WebSocket.WsRouteSendOptions) | Promise&lt;AventusSharp.ExtractResponse&lt;AventusSharp.WebSocket.StorableWsRouter_Delete&gt;&gt; |  |
| DeleteMany(body: { ids: number[]; }, options: AventusSharp.WebSocket.WsRouteSendOptions) | Promise&lt;AventusSharp.ExtractResponse&lt;AventusSharp.WebSocket.StorableWsRoute_DeleteMany&gt;&gt; |  |
| StorableName() | string | (abstract) |

## AventusSharp.WebSocket.VoidWithWsError

 - Type : Class
 - Import : import { VoidWithWsError } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : AventusSharp.Tools.VoidWithError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.WebSocket.WsError

 - Type : Class
 - Import : import { WsError } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"
 - Parent : Aventus.GenericError

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string | Fullname of the class |

## AventusSharp.WebSocket.WsEvent<T extends any = any>

 - Type : Class
 - Import : import { WsEvent } from "AventusSharp@Main:AventusSharp.WebSocket.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| onTrigger | Aventus.Callback&lt;(item: Aventus.ExtractFromError&lt;T&gt;, params: Aventus.UriParamsValue, uid?: string) =&gt; void(item: Aventus.ExtractFromError&lt;T&gt;, params: Aventus.UriParamsValue, uid: string): void&gt; |  |
| listening | boolean |  |
| getPrefix | () =&gt; string(): string |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| init() | void |  |
| listen() | void | Add the event to the endpoint. After that, the on trigger event can be triggered |
| stop() | void | Remove the event from the endpoint. After that, the on trigger event won't be triggered |
