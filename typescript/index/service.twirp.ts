import {
  TwirpContext,
  TwirpServer,
  RouterEvents,
  TwirpError,
  TwirpErrorCode,
  Interceptor,
  TwirpContentType,
  chainInterceptors,
} from "twirp-ts";
import {
  RegisterClusterRequest,
  RegisterClusterResponse,
  ListClustersRequest,
  ListClustersResponse,
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteIndexSetRequest,
  DeleteIndexSetResponse,
  ReindexRequest,
  ReindexResponse,
  PartialReindexRequest,
  PartialReindexResponse,
  ListIndexSetsRequest,
  ListIndexSetsResponse,
  SetIndexSetStatusRequest,
  SetIndexSetStatusResponse,
} from "./service";

//==================================//
//          Client Code             //
//==================================//

interface Rpc {
  request(
    service: string,
    method: string,
    contentType: "application/json" | "application/protobuf",
    data: object | Uint8Array
  ): Promise<object | Uint8Array>;
}

export interface ManagementClient {
  RegisterCluster(
    request: RegisterClusterRequest
  ): Promise<RegisterClusterResponse>;
  ListClusters(request: ListClustersRequest): Promise<ListClustersResponse>;
  DeleteCluster(request: DeleteClusterRequest): Promise<DeleteClusterResponse>;
  DeleteIndexSet(
    request: DeleteIndexSetRequest
  ): Promise<DeleteIndexSetResponse>;
  Reindex(request: ReindexRequest): Promise<ReindexResponse>;
  PartialReindex(
    request: PartialReindexRequest
  ): Promise<PartialReindexResponse>;
  ListIndexSets(request: ListIndexSetsRequest): Promise<ListIndexSetsResponse>;
  SetIndexSetStatus(
    request: SetIndexSetStatusRequest
  ): Promise<SetIndexSetStatusResponse>;
}

export class ManagementClientJSON implements ManagementClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterCluster.bind(this);
    this.ListClusters.bind(this);
    this.DeleteCluster.bind(this);
    this.DeleteIndexSet.bind(this);
    this.Reindex.bind(this);
    this.PartialReindex.bind(this);
    this.ListIndexSets.bind(this);
    this.SetIndexSetStatus.bind(this);
  }
  RegisterCluster(
    request: RegisterClusterRequest
  ): Promise<RegisterClusterResponse> {
    const data = RegisterClusterRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.index.Management",
      "RegisterCluster",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      RegisterClusterResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  ListClusters(request: ListClustersRequest): Promise<ListClustersResponse> {
    const data = ListClustersRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.index.Management",
      "ListClusters",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      ListClustersResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  DeleteCluster(request: DeleteClusterRequest): Promise<DeleteClusterResponse> {
    const data = DeleteClusterRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.index.Management",
      "DeleteCluster",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      DeleteClusterResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  DeleteIndexSet(
    request: DeleteIndexSetRequest
  ): Promise<DeleteIndexSetResponse> {
    const data = DeleteIndexSetRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.index.Management",
      "DeleteIndexSet",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      DeleteIndexSetResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  Reindex(request: ReindexRequest): Promise<ReindexResponse> {
    const data = ReindexRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.index.Management",
      "Reindex",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      ReindexResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  PartialReindex(
    request: PartialReindexRequest
  ): Promise<PartialReindexResponse> {
    const data = PartialReindexRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.index.Management",
      "PartialReindex",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      PartialReindexResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  ListIndexSets(request: ListIndexSetsRequest): Promise<ListIndexSetsResponse> {
    const data = ListIndexSetsRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.index.Management",
      "ListIndexSets",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      ListIndexSetsResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  SetIndexSetStatus(
    request: SetIndexSetStatusRequest
  ): Promise<SetIndexSetStatusResponse> {
    const data = SetIndexSetStatusRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.index.Management",
      "SetIndexSetStatus",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      SetIndexSetStatusResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }
}

export class ManagementClientProtobuf implements ManagementClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterCluster.bind(this);
    this.ListClusters.bind(this);
    this.DeleteCluster.bind(this);
    this.DeleteIndexSet.bind(this);
    this.Reindex.bind(this);
    this.PartialReindex.bind(this);
    this.ListIndexSets.bind(this);
    this.SetIndexSetStatus.bind(this);
  }
  RegisterCluster(
    request: RegisterClusterRequest
  ): Promise<RegisterClusterResponse> {
    const data = RegisterClusterRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.index.Management",
      "RegisterCluster",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      RegisterClusterResponse.fromBinary(data as Uint8Array)
    );
  }

  ListClusters(request: ListClustersRequest): Promise<ListClustersResponse> {
    const data = ListClustersRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.index.Management",
      "ListClusters",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      ListClustersResponse.fromBinary(data as Uint8Array)
    );
  }

  DeleteCluster(request: DeleteClusterRequest): Promise<DeleteClusterResponse> {
    const data = DeleteClusterRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.index.Management",
      "DeleteCluster",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      DeleteClusterResponse.fromBinary(data as Uint8Array)
    );
  }

  DeleteIndexSet(
    request: DeleteIndexSetRequest
  ): Promise<DeleteIndexSetResponse> {
    const data = DeleteIndexSetRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.index.Management",
      "DeleteIndexSet",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      DeleteIndexSetResponse.fromBinary(data as Uint8Array)
    );
  }

  Reindex(request: ReindexRequest): Promise<ReindexResponse> {
    const data = ReindexRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.index.Management",
      "Reindex",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      ReindexResponse.fromBinary(data as Uint8Array)
    );
  }

  PartialReindex(
    request: PartialReindexRequest
  ): Promise<PartialReindexResponse> {
    const data = PartialReindexRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.index.Management",
      "PartialReindex",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      PartialReindexResponse.fromBinary(data as Uint8Array)
    );
  }

  ListIndexSets(request: ListIndexSetsRequest): Promise<ListIndexSetsResponse> {
    const data = ListIndexSetsRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.index.Management",
      "ListIndexSets",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      ListIndexSetsResponse.fromBinary(data as Uint8Array)
    );
  }

  SetIndexSetStatus(
    request: SetIndexSetStatusRequest
  ): Promise<SetIndexSetStatusResponse> {
    const data = SetIndexSetStatusRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.index.Management",
      "SetIndexSetStatus",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      SetIndexSetStatusResponse.fromBinary(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface ManagementTwirp<T extends TwirpContext = TwirpContext> {
  RegisterCluster(
    ctx: T,
    request: RegisterClusterRequest
  ): Promise<RegisterClusterResponse>;
  ListClusters(
    ctx: T,
    request: ListClustersRequest
  ): Promise<ListClustersResponse>;
  DeleteCluster(
    ctx: T,
    request: DeleteClusterRequest
  ): Promise<DeleteClusterResponse>;
  DeleteIndexSet(
    ctx: T,
    request: DeleteIndexSetRequest
  ): Promise<DeleteIndexSetResponse>;
  Reindex(ctx: T, request: ReindexRequest): Promise<ReindexResponse>;
  PartialReindex(
    ctx: T,
    request: PartialReindexRequest
  ): Promise<PartialReindexResponse>;
  ListIndexSets(
    ctx: T,
    request: ListIndexSetsRequest
  ): Promise<ListIndexSetsResponse>;
  SetIndexSetStatus(
    ctx: T,
    request: SetIndexSetStatusRequest
  ): Promise<SetIndexSetStatusResponse>;
}

export enum ManagementMethod {
  RegisterCluster = "RegisterCluster",
  ListClusters = "ListClusters",
  DeleteCluster = "DeleteCluster",
  DeleteIndexSet = "DeleteIndexSet",
  Reindex = "Reindex",
  PartialReindex = "PartialReindex",
  ListIndexSets = "ListIndexSets",
  SetIndexSetStatus = "SetIndexSetStatus",
}

export const ManagementMethodList = [
  ManagementMethod.RegisterCluster,
  ManagementMethod.ListClusters,
  ManagementMethod.DeleteCluster,
  ManagementMethod.DeleteIndexSet,
  ManagementMethod.Reindex,
  ManagementMethod.PartialReindex,
  ManagementMethod.ListIndexSets,
  ManagementMethod.SetIndexSetStatus,
];

export function createManagementServer<T extends TwirpContext = TwirpContext>(
  service: ManagementTwirp<T>
) {
  return new TwirpServer<ManagementTwirp, T>({
    service,
    packageName: "elephant.index",
    serviceName: "Management",
    methodList: ManagementMethodList,
    matchRoute: matchManagementRoute,
  });
}

function matchManagementRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "RegisterCluster":
      return async (
        ctx: T,
        service: ManagementTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          RegisterClusterRequest,
          RegisterClusterResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "RegisterCluster" };
        await events.onMatch(ctx);
        return handleManagementRegisterClusterRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "ListClusters":
      return async (
        ctx: T,
        service: ManagementTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          ListClustersRequest,
          ListClustersResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "ListClusters" };
        await events.onMatch(ctx);
        return handleManagementListClustersRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "DeleteCluster":
      return async (
        ctx: T,
        service: ManagementTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          DeleteClusterRequest,
          DeleteClusterResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "DeleteCluster" };
        await events.onMatch(ctx);
        return handleManagementDeleteClusterRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "DeleteIndexSet":
      return async (
        ctx: T,
        service: ManagementTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          DeleteIndexSetRequest,
          DeleteIndexSetResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "DeleteIndexSet" };
        await events.onMatch(ctx);
        return handleManagementDeleteIndexSetRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "Reindex":
      return async (
        ctx: T,
        service: ManagementTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, ReindexRequest, ReindexResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Reindex" };
        await events.onMatch(ctx);
        return handleManagementReindexRequest(ctx, service, data, interceptors);
      };
    case "PartialReindex":
      return async (
        ctx: T,
        service: ManagementTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          PartialReindexRequest,
          PartialReindexResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "PartialReindex" };
        await events.onMatch(ctx);
        return handleManagementPartialReindexRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "ListIndexSets":
      return async (
        ctx: T,
        service: ManagementTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          ListIndexSetsRequest,
          ListIndexSetsResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "ListIndexSets" };
        await events.onMatch(ctx);
        return handleManagementListIndexSetsRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "SetIndexSetStatus":
      return async (
        ctx: T,
        service: ManagementTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          SetIndexSetStatusRequest,
          SetIndexSetStatusResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "SetIndexSetStatus" };
        await events.onMatch(ctx);
        return handleManagementSetIndexSetStatusRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    default:
      events.onNotFound();
      const msg = `no handler found`;
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleManagementRegisterClusterRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterClusterRequest,
    RegisterClusterResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleManagementRegisterClusterJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleManagementRegisterClusterProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleManagementListClustersRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListClustersRequest, ListClustersResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleManagementListClustersJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleManagementListClustersProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleManagementDeleteClusterRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteClusterRequest, DeleteClusterResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleManagementDeleteClusterJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleManagementDeleteClusterProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleManagementDeleteIndexSetRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteIndexSetRequest, DeleteIndexSetResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleManagementDeleteIndexSetJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleManagementDeleteIndexSetProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleManagementReindexRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ReindexRequest, ReindexResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleManagementReindexJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleManagementReindexProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleManagementPartialReindexRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, PartialReindexRequest, PartialReindexResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleManagementPartialReindexJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleManagementPartialReindexProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleManagementListIndexSetsRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListIndexSetsRequest, ListIndexSetsResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleManagementListIndexSetsJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleManagementListIndexSetsProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleManagementSetIndexSetStatusRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SetIndexSetStatusRequest,
    SetIndexSetStatusResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleManagementSetIndexSetStatusJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleManagementSetIndexSetStatusProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}
async function handleManagementRegisterClusterJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterClusterRequest,
    RegisterClusterResponse
  >[]
) {
  let request: RegisterClusterRequest;
  let response: RegisterClusterResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = RegisterClusterRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RegisterClusterRequest,
      RegisterClusterResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterCluster(ctx, inputReq);
    });
  } else {
    response = await service.RegisterCluster(ctx, request!);
  }

  return JSON.stringify(
    RegisterClusterResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleManagementListClustersJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListClustersRequest, ListClustersResponse>[]
) {
  let request: ListClustersRequest;
  let response: ListClustersResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = ListClustersRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ListClustersRequest,
      ListClustersResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ListClusters(ctx, inputReq);
    });
  } else {
    response = await service.ListClusters(ctx, request!);
  }

  return JSON.stringify(
    ListClustersResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleManagementDeleteClusterJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteClusterRequest, DeleteClusterResponse>[]
) {
  let request: DeleteClusterRequest;
  let response: DeleteClusterResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = DeleteClusterRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteClusterRequest,
      DeleteClusterResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteCluster(ctx, inputReq);
    });
  } else {
    response = await service.DeleteCluster(ctx, request!);
  }

  return JSON.stringify(
    DeleteClusterResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleManagementDeleteIndexSetJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteIndexSetRequest, DeleteIndexSetResponse>[]
) {
  let request: DeleteIndexSetRequest;
  let response: DeleteIndexSetResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = DeleteIndexSetRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteIndexSetRequest,
      DeleteIndexSetResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteIndexSet(ctx, inputReq);
    });
  } else {
    response = await service.DeleteIndexSet(ctx, request!);
  }

  return JSON.stringify(
    DeleteIndexSetResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleManagementReindexJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ReindexRequest, ReindexResponse>[]
) {
  let request: ReindexRequest;
  let response: ReindexResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = ReindexRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ReindexRequest,
      ReindexResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Reindex(ctx, inputReq);
    });
  } else {
    response = await service.Reindex(ctx, request!);
  }

  return JSON.stringify(
    ReindexResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleManagementPartialReindexJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, PartialReindexRequest, PartialReindexResponse>[]
) {
  let request: PartialReindexRequest;
  let response: PartialReindexResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = PartialReindexRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      PartialReindexRequest,
      PartialReindexResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.PartialReindex(ctx, inputReq);
    });
  } else {
    response = await service.PartialReindex(ctx, request!);
  }

  return JSON.stringify(
    PartialReindexResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleManagementListIndexSetsJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListIndexSetsRequest, ListIndexSetsResponse>[]
) {
  let request: ListIndexSetsRequest;
  let response: ListIndexSetsResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = ListIndexSetsRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ListIndexSetsRequest,
      ListIndexSetsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ListIndexSets(ctx, inputReq);
    });
  } else {
    response = await service.ListIndexSets(ctx, request!);
  }

  return JSON.stringify(
    ListIndexSetsResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleManagementSetIndexSetStatusJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SetIndexSetStatusRequest,
    SetIndexSetStatusResponse
  >[]
) {
  let request: SetIndexSetStatusRequest;
  let response: SetIndexSetStatusResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SetIndexSetStatusRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SetIndexSetStatusRequest,
      SetIndexSetStatusResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SetIndexSetStatus(ctx, inputReq);
    });
  } else {
    response = await service.SetIndexSetStatus(ctx, request!);
  }

  return JSON.stringify(
    SetIndexSetStatusResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleManagementRegisterClusterProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterClusterRequest,
    RegisterClusterResponse
  >[]
) {
  let request: RegisterClusterRequest;
  let response: RegisterClusterResponse;

  try {
    request = RegisterClusterRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RegisterClusterRequest,
      RegisterClusterResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterCluster(ctx, inputReq);
    });
  } else {
    response = await service.RegisterCluster(ctx, request!);
  }

  return Buffer.from(RegisterClusterResponse.toBinary(response));
}

async function handleManagementListClustersProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListClustersRequest, ListClustersResponse>[]
) {
  let request: ListClustersRequest;
  let response: ListClustersResponse;

  try {
    request = ListClustersRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ListClustersRequest,
      ListClustersResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ListClusters(ctx, inputReq);
    });
  } else {
    response = await service.ListClusters(ctx, request!);
  }

  return Buffer.from(ListClustersResponse.toBinary(response));
}

async function handleManagementDeleteClusterProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteClusterRequest, DeleteClusterResponse>[]
) {
  let request: DeleteClusterRequest;
  let response: DeleteClusterResponse;

  try {
    request = DeleteClusterRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteClusterRequest,
      DeleteClusterResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteCluster(ctx, inputReq);
    });
  } else {
    response = await service.DeleteCluster(ctx, request!);
  }

  return Buffer.from(DeleteClusterResponse.toBinary(response));
}

async function handleManagementDeleteIndexSetProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteIndexSetRequest, DeleteIndexSetResponse>[]
) {
  let request: DeleteIndexSetRequest;
  let response: DeleteIndexSetResponse;

  try {
    request = DeleteIndexSetRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteIndexSetRequest,
      DeleteIndexSetResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteIndexSet(ctx, inputReq);
    });
  } else {
    response = await service.DeleteIndexSet(ctx, request!);
  }

  return Buffer.from(DeleteIndexSetResponse.toBinary(response));
}

async function handleManagementReindexProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ReindexRequest, ReindexResponse>[]
) {
  let request: ReindexRequest;
  let response: ReindexResponse;

  try {
    request = ReindexRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ReindexRequest,
      ReindexResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Reindex(ctx, inputReq);
    });
  } else {
    response = await service.Reindex(ctx, request!);
  }

  return Buffer.from(ReindexResponse.toBinary(response));
}

async function handleManagementPartialReindexProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, PartialReindexRequest, PartialReindexResponse>[]
) {
  let request: PartialReindexRequest;
  let response: PartialReindexResponse;

  try {
    request = PartialReindexRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      PartialReindexRequest,
      PartialReindexResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.PartialReindex(ctx, inputReq);
    });
  } else {
    response = await service.PartialReindex(ctx, request!);
  }

  return Buffer.from(PartialReindexResponse.toBinary(response));
}

async function handleManagementListIndexSetsProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListIndexSetsRequest, ListIndexSetsResponse>[]
) {
  let request: ListIndexSetsRequest;
  let response: ListIndexSetsResponse;

  try {
    request = ListIndexSetsRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ListIndexSetsRequest,
      ListIndexSetsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ListIndexSets(ctx, inputReq);
    });
  } else {
    response = await service.ListIndexSets(ctx, request!);
  }

  return Buffer.from(ListIndexSetsResponse.toBinary(response));
}

async function handleManagementSetIndexSetStatusProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ManagementTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SetIndexSetStatusRequest,
    SetIndexSetStatusResponse
  >[]
) {
  let request: SetIndexSetStatusRequest;
  let response: SetIndexSetStatusResponse;

  try {
    request = SetIndexSetStatusRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SetIndexSetStatusRequest,
      SetIndexSetStatusResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SetIndexSetStatus(ctx, inputReq);
    });
  } else {
    response = await service.SetIndexSetStatus(ctx, request!);
  }

  return Buffer.from(SetIndexSetStatusResponse.toBinary(response));
}
