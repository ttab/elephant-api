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
  GetDocumentRequest,
  GetDocumentResponse,
  GetHistoryRequest,
  GetHistoryResponse,
  UpdateRequest,
  UpdateResponse,
  BulkUpdateRequest,
  BulkUpdateResponse,
  ValidateRequest,
  ValidateResponse,
  DeleteDocumentRequest,
  DeleteDocumentResponse,
  ListDeletedRequest,
  ListDeletedResponse,
  RestoreRequest,
  RestoreResponse,
  PurgeRequest,
  PurgeResponse,
  GetMetaRequest,
  GetMetaResponse,
  GetEventlogRequest,
  GetEventlogResponse,
  GetCompactedEventlogRequest,
  GetCompactedEventlogResponse,
  GetStatusHistoryRequest,
  GetStatusHistoryReponse,
  GetStatusOverviewRequest,
  GetStatusOverviewResponse,
  GetPermissionsRequest,
  GetPermissionsResponse,
  LockRequest,
  LockResponse,
  ExtendLockRequest,
  UnlockRequest,
  UnlockResponse,
  RegisterSchemaRequest,
  RegisterSchemaResponse,
  SetActiveSchemaRequest,
  SetActiveSchemaResponse,
  GetSchemaRequest,
  GetSchemaResponse,
  GetAllActiveSchemasRequest,
  GetAllActiveSchemasResponse,
  RegisterMetaTypeRequest,
  RegisterMetaTypeResponse,
  RegisterMetaTypeUseRequest,
  RegisterMetaTypeUseResponse,
  GetDeprecationsRequest,
  GetDeprecationsResponse,
  UpdateDeprecationRequest,
  UpdateDeprecationResponse,
  UpdateStatusRequest,
  UpdateStatusResponse,
  GetStatusesRequest,
  GetStatusesResponse,
  CreateStatusRuleRequest,
  CreateStatusRuleResponse,
  DeleteStatusRuleRequest,
  DeleteStatusRuleResponse,
  GetStatusRulesRequest,
  GetStatusRulesResponse,
  ListReportsRequest,
  ListReportsResponse,
  UpdateReportRequest,
  UpdateReportResponse,
  GetReportRequest,
  GetReportResponse,
  DeleteReportRequest,
  DeleteReportResponse,
  RunReportRequest,
  RunReportResponse,
  TestReportRequest,
  TestReportResponse,
  RegisterMetricKindRequest,
  RegisterMetricKindResponse,
  DeleteMetricKindRequest,
  DeleteMetricKindResponse,
  GetMetricKindsRequest,
  GetMetricKindsResponse,
  RegisterMetricRequest,
  RegisterMetricResponse,
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

export interface DocumentsClient {
  Get(request: GetDocumentRequest): Promise<GetDocumentResponse>;
  GetHistory(request: GetHistoryRequest): Promise<GetHistoryResponse>;
  Update(request: UpdateRequest): Promise<UpdateResponse>;
  BulkUpdate(request: BulkUpdateRequest): Promise<BulkUpdateResponse>;
  Validate(request: ValidateRequest): Promise<ValidateResponse>;
  Delete(request: DeleteDocumentRequest): Promise<DeleteDocumentResponse>;
  ListDeleted(request: ListDeletedRequest): Promise<ListDeletedResponse>;
  Restore(request: RestoreRequest): Promise<RestoreResponse>;
  Purge(request: PurgeRequest): Promise<PurgeResponse>;
  GetMeta(request: GetMetaRequest): Promise<GetMetaResponse>;
  Eventlog(request: GetEventlogRequest): Promise<GetEventlogResponse>;
  CompactedEventlog(
    request: GetCompactedEventlogRequest
  ): Promise<GetCompactedEventlogResponse>;
  GetStatusHistory(
    request: GetStatusHistoryRequest
  ): Promise<GetStatusHistoryReponse>;
  GetStatusOverview(
    request: GetStatusOverviewRequest
  ): Promise<GetStatusOverviewResponse>;
  GetPermissions(
    request: GetPermissionsRequest
  ): Promise<GetPermissionsResponse>;
  Lock(request: LockRequest): Promise<LockResponse>;
  ExtendLock(request: ExtendLockRequest): Promise<LockResponse>;
  Unlock(request: UnlockRequest): Promise<UnlockResponse>;
}

export class DocumentsClientJSON implements DocumentsClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Get.bind(this);
    this.GetHistory.bind(this);
    this.Update.bind(this);
    this.BulkUpdate.bind(this);
    this.Validate.bind(this);
    this.Delete.bind(this);
    this.ListDeleted.bind(this);
    this.Restore.bind(this);
    this.Purge.bind(this);
    this.GetMeta.bind(this);
    this.Eventlog.bind(this);
    this.CompactedEventlog.bind(this);
    this.GetStatusHistory.bind(this);
    this.GetStatusOverview.bind(this);
    this.GetPermissions.bind(this);
    this.Lock.bind(this);
    this.ExtendLock.bind(this);
    this.Unlock.bind(this);
  }
  Get(request: GetDocumentRequest): Promise<GetDocumentResponse> {
    const data = GetDocumentRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Get",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetDocumentResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  GetHistory(request: GetHistoryRequest): Promise<GetHistoryResponse> {
    const data = GetHistoryRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetHistory",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetHistoryResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Update(request: UpdateRequest): Promise<UpdateResponse> {
    const data = UpdateRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Update",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      UpdateResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  BulkUpdate(request: BulkUpdateRequest): Promise<BulkUpdateResponse> {
    const data = BulkUpdateRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "BulkUpdate",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      BulkUpdateResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Validate(request: ValidateRequest): Promise<ValidateResponse> {
    const data = ValidateRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Validate",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      ValidateResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Delete(request: DeleteDocumentRequest): Promise<DeleteDocumentResponse> {
    const data = DeleteDocumentRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Delete",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      DeleteDocumentResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  ListDeleted(request: ListDeletedRequest): Promise<ListDeletedResponse> {
    const data = ListDeletedRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "ListDeleted",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      ListDeletedResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Restore(request: RestoreRequest): Promise<RestoreResponse> {
    const data = RestoreRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Restore",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      RestoreResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Purge(request: PurgeRequest): Promise<PurgeResponse> {
    const data = PurgeRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Purge",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      PurgeResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  GetMeta(request: GetMetaRequest): Promise<GetMetaResponse> {
    const data = GetMetaRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetMeta",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetMetaResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Eventlog(request: GetEventlogRequest): Promise<GetEventlogResponse> {
    const data = GetEventlogRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Eventlog",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetEventlogResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  CompactedEventlog(
    request: GetCompactedEventlogRequest
  ): Promise<GetCompactedEventlogResponse> {
    const data = GetCompactedEventlogRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "CompactedEventlog",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetCompactedEventlogResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetStatusHistory(
    request: GetStatusHistoryRequest
  ): Promise<GetStatusHistoryReponse> {
    const data = GetStatusHistoryRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetStatusHistory",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetStatusHistoryReponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetStatusOverview(
    request: GetStatusOverviewRequest
  ): Promise<GetStatusOverviewResponse> {
    const data = GetStatusOverviewRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetStatusOverview",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetStatusOverviewResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetPermissions(
    request: GetPermissionsRequest
  ): Promise<GetPermissionsResponse> {
    const data = GetPermissionsRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetPermissions",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetPermissionsResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  Lock(request: LockRequest): Promise<LockResponse> {
    const data = LockRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Lock",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      LockResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  ExtendLock(request: ExtendLockRequest): Promise<LockResponse> {
    const data = ExtendLockRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "ExtendLock",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      LockResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Unlock(request: UnlockRequest): Promise<UnlockResponse> {
    const data = UnlockRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Unlock",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      UnlockResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }
}

export class DocumentsClientProtobuf implements DocumentsClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Get.bind(this);
    this.GetHistory.bind(this);
    this.Update.bind(this);
    this.BulkUpdate.bind(this);
    this.Validate.bind(this);
    this.Delete.bind(this);
    this.ListDeleted.bind(this);
    this.Restore.bind(this);
    this.Purge.bind(this);
    this.GetMeta.bind(this);
    this.Eventlog.bind(this);
    this.CompactedEventlog.bind(this);
    this.GetStatusHistory.bind(this);
    this.GetStatusOverview.bind(this);
    this.GetPermissions.bind(this);
    this.Lock.bind(this);
    this.ExtendLock.bind(this);
    this.Unlock.bind(this);
  }
  Get(request: GetDocumentRequest): Promise<GetDocumentResponse> {
    const data = GetDocumentRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Get",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetDocumentResponse.fromBinary(data as Uint8Array)
    );
  }

  GetHistory(request: GetHistoryRequest): Promise<GetHistoryResponse> {
    const data = GetHistoryRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetHistory",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetHistoryResponse.fromBinary(data as Uint8Array)
    );
  }

  Update(request: UpdateRequest): Promise<UpdateResponse> {
    const data = UpdateRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Update",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      UpdateResponse.fromBinary(data as Uint8Array)
    );
  }

  BulkUpdate(request: BulkUpdateRequest): Promise<BulkUpdateResponse> {
    const data = BulkUpdateRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "BulkUpdate",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      BulkUpdateResponse.fromBinary(data as Uint8Array)
    );
  }

  Validate(request: ValidateRequest): Promise<ValidateResponse> {
    const data = ValidateRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Validate",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      ValidateResponse.fromBinary(data as Uint8Array)
    );
  }

  Delete(request: DeleteDocumentRequest): Promise<DeleteDocumentResponse> {
    const data = DeleteDocumentRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Delete",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      DeleteDocumentResponse.fromBinary(data as Uint8Array)
    );
  }

  ListDeleted(request: ListDeletedRequest): Promise<ListDeletedResponse> {
    const data = ListDeletedRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "ListDeleted",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      ListDeletedResponse.fromBinary(data as Uint8Array)
    );
  }

  Restore(request: RestoreRequest): Promise<RestoreResponse> {
    const data = RestoreRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Restore",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      RestoreResponse.fromBinary(data as Uint8Array)
    );
  }

  Purge(request: PurgeRequest): Promise<PurgeResponse> {
    const data = PurgeRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Purge",
      "application/protobuf",
      data
    );
    return promise.then((data) => PurgeResponse.fromBinary(data as Uint8Array));
  }

  GetMeta(request: GetMetaRequest): Promise<GetMetaResponse> {
    const data = GetMetaRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetMeta",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetMetaResponse.fromBinary(data as Uint8Array)
    );
  }

  Eventlog(request: GetEventlogRequest): Promise<GetEventlogResponse> {
    const data = GetEventlogRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Eventlog",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetEventlogResponse.fromBinary(data as Uint8Array)
    );
  }

  CompactedEventlog(
    request: GetCompactedEventlogRequest
  ): Promise<GetCompactedEventlogResponse> {
    const data = GetCompactedEventlogRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "CompactedEventlog",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetCompactedEventlogResponse.fromBinary(data as Uint8Array)
    );
  }

  GetStatusHistory(
    request: GetStatusHistoryRequest
  ): Promise<GetStatusHistoryReponse> {
    const data = GetStatusHistoryRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetStatusHistory",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetStatusHistoryReponse.fromBinary(data as Uint8Array)
    );
  }

  GetStatusOverview(
    request: GetStatusOverviewRequest
  ): Promise<GetStatusOverviewResponse> {
    const data = GetStatusOverviewRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetStatusOverview",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetStatusOverviewResponse.fromBinary(data as Uint8Array)
    );
  }

  GetPermissions(
    request: GetPermissionsRequest
  ): Promise<GetPermissionsResponse> {
    const data = GetPermissionsRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "GetPermissions",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetPermissionsResponse.fromBinary(data as Uint8Array)
    );
  }

  Lock(request: LockRequest): Promise<LockResponse> {
    const data = LockRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Lock",
      "application/protobuf",
      data
    );
    return promise.then((data) => LockResponse.fromBinary(data as Uint8Array));
  }

  ExtendLock(request: ExtendLockRequest): Promise<LockResponse> {
    const data = ExtendLockRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "ExtendLock",
      "application/protobuf",
      data
    );
    return promise.then((data) => LockResponse.fromBinary(data as Uint8Array));
  }

  Unlock(request: UnlockRequest): Promise<UnlockResponse> {
    const data = UnlockRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Documents",
      "Unlock",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      UnlockResponse.fromBinary(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface DocumentsTwirp<T extends TwirpContext = TwirpContext> {
  Get(ctx: T, request: GetDocumentRequest): Promise<GetDocumentResponse>;
  GetHistory(ctx: T, request: GetHistoryRequest): Promise<GetHistoryResponse>;
  Update(ctx: T, request: UpdateRequest): Promise<UpdateResponse>;
  BulkUpdate(ctx: T, request: BulkUpdateRequest): Promise<BulkUpdateResponse>;
  Validate(ctx: T, request: ValidateRequest): Promise<ValidateResponse>;
  Delete(
    ctx: T,
    request: DeleteDocumentRequest
  ): Promise<DeleteDocumentResponse>;
  ListDeleted(
    ctx: T,
    request: ListDeletedRequest
  ): Promise<ListDeletedResponse>;
  Restore(ctx: T, request: RestoreRequest): Promise<RestoreResponse>;
  Purge(ctx: T, request: PurgeRequest): Promise<PurgeResponse>;
  GetMeta(ctx: T, request: GetMetaRequest): Promise<GetMetaResponse>;
  Eventlog(ctx: T, request: GetEventlogRequest): Promise<GetEventlogResponse>;
  CompactedEventlog(
    ctx: T,
    request: GetCompactedEventlogRequest
  ): Promise<GetCompactedEventlogResponse>;
  GetStatusHistory(
    ctx: T,
    request: GetStatusHistoryRequest
  ): Promise<GetStatusHistoryReponse>;
  GetStatusOverview(
    ctx: T,
    request: GetStatusOverviewRequest
  ): Promise<GetStatusOverviewResponse>;
  GetPermissions(
    ctx: T,
    request: GetPermissionsRequest
  ): Promise<GetPermissionsResponse>;
  Lock(ctx: T, request: LockRequest): Promise<LockResponse>;
  ExtendLock(ctx: T, request: ExtendLockRequest): Promise<LockResponse>;
  Unlock(ctx: T, request: UnlockRequest): Promise<UnlockResponse>;
}

export enum DocumentsMethod {
  Get = "Get",
  GetHistory = "GetHistory",
  Update = "Update",
  BulkUpdate = "BulkUpdate",
  Validate = "Validate",
  Delete = "Delete",
  ListDeleted = "ListDeleted",
  Restore = "Restore",
  Purge = "Purge",
  GetMeta = "GetMeta",
  Eventlog = "Eventlog",
  CompactedEventlog = "CompactedEventlog",
  GetStatusHistory = "GetStatusHistory",
  GetStatusOverview = "GetStatusOverview",
  GetPermissions = "GetPermissions",
  Lock = "Lock",
  ExtendLock = "ExtendLock",
  Unlock = "Unlock",
}

export const DocumentsMethodList = [
  DocumentsMethod.Get,
  DocumentsMethod.GetHistory,
  DocumentsMethod.Update,
  DocumentsMethod.BulkUpdate,
  DocumentsMethod.Validate,
  DocumentsMethod.Delete,
  DocumentsMethod.ListDeleted,
  DocumentsMethod.Restore,
  DocumentsMethod.Purge,
  DocumentsMethod.GetMeta,
  DocumentsMethod.Eventlog,
  DocumentsMethod.CompactedEventlog,
  DocumentsMethod.GetStatusHistory,
  DocumentsMethod.GetStatusOverview,
  DocumentsMethod.GetPermissions,
  DocumentsMethod.Lock,
  DocumentsMethod.ExtendLock,
  DocumentsMethod.Unlock,
];

export function createDocumentsServer<T extends TwirpContext = TwirpContext>(
  service: DocumentsTwirp<T>
) {
  return new TwirpServer<DocumentsTwirp, T>({
    service,
    packageName: "elephant.repository",
    serviceName: "Documents",
    methodList: DocumentsMethodList,
    matchRoute: matchDocumentsRoute,
  });
}

function matchDocumentsRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "Get":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, GetDocumentRequest, GetDocumentResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Get" };
        await events.onMatch(ctx);
        return handleDocumentsGetRequest(ctx, service, data, interceptors);
      };
    case "GetHistory":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, GetHistoryRequest, GetHistoryResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "GetHistory" };
        await events.onMatch(ctx);
        return handleDocumentsGetHistoryRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "Update":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, UpdateRequest, UpdateResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Update" };
        await events.onMatch(ctx);
        return handleDocumentsUpdateRequest(ctx, service, data, interceptors);
      };
    case "BulkUpdate":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, BulkUpdateRequest, BulkUpdateResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "BulkUpdate" };
        await events.onMatch(ctx);
        return handleDocumentsBulkUpdateRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "Validate":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, ValidateRequest, ValidateResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Validate" };
        await events.onMatch(ctx);
        return handleDocumentsValidateRequest(ctx, service, data, interceptors);
      };
    case "Delete":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          DeleteDocumentRequest,
          DeleteDocumentResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "Delete" };
        await events.onMatch(ctx);
        return handleDocumentsDeleteRequest(ctx, service, data, interceptors);
      };
    case "ListDeleted":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, ListDeletedRequest, ListDeletedResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "ListDeleted" };
        await events.onMatch(ctx);
        return handleDocumentsListDeletedRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "Restore":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, RestoreRequest, RestoreResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Restore" };
        await events.onMatch(ctx);
        return handleDocumentsRestoreRequest(ctx, service, data, interceptors);
      };
    case "Purge":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, PurgeRequest, PurgeResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Purge" };
        await events.onMatch(ctx);
        return handleDocumentsPurgeRequest(ctx, service, data, interceptors);
      };
    case "GetMeta":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, GetMetaRequest, GetMetaResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "GetMeta" };
        await events.onMatch(ctx);
        return handleDocumentsGetMetaRequest(ctx, service, data, interceptors);
      };
    case "Eventlog":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, GetEventlogRequest, GetEventlogResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Eventlog" };
        await events.onMatch(ctx);
        return handleDocumentsEventlogRequest(ctx, service, data, interceptors);
      };
    case "CompactedEventlog":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetCompactedEventlogRequest,
          GetCompactedEventlogResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "CompactedEventlog" };
        await events.onMatch(ctx);
        return handleDocumentsCompactedEventlogRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetStatusHistory":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetStatusHistoryRequest,
          GetStatusHistoryReponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetStatusHistory" };
        await events.onMatch(ctx);
        return handleDocumentsGetStatusHistoryRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetStatusOverview":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetStatusOverviewRequest,
          GetStatusOverviewResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetStatusOverview" };
        await events.onMatch(ctx);
        return handleDocumentsGetStatusOverviewRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetPermissions":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetPermissionsRequest,
          GetPermissionsResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetPermissions" };
        await events.onMatch(ctx);
        return handleDocumentsGetPermissionsRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "Lock":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, LockRequest, LockResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Lock" };
        await events.onMatch(ctx);
        return handleDocumentsLockRequest(ctx, service, data, interceptors);
      };
    case "ExtendLock":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, ExtendLockRequest, LockResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "ExtendLock" };
        await events.onMatch(ctx);
        return handleDocumentsExtendLockRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "Unlock":
      return async (
        ctx: T,
        service: DocumentsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, UnlockRequest, UnlockResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Unlock" };
        await events.onMatch(ctx);
        return handleDocumentsUnlockRequest(ctx, service, data, interceptors);
      };
    default:
      events.onNotFound();
      const msg = `no handler found`;
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleDocumentsGetRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetDocumentRequest, GetDocumentResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsGetJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsGetProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleDocumentsGetHistoryRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetHistoryRequest, GetHistoryResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsGetHistoryJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsGetHistoryProtobuf<T>(
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

function handleDocumentsUpdateRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpdateRequest, UpdateResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsUpdateJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsUpdateProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleDocumentsBulkUpdateRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, BulkUpdateRequest, BulkUpdateResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsBulkUpdateJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsBulkUpdateProtobuf<T>(
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

function handleDocumentsValidateRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ValidateRequest, ValidateResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsValidateJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsValidateProtobuf<T>(
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

function handleDocumentsDeleteRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteDocumentRequest, DeleteDocumentResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsDeleteJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsDeleteProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleDocumentsListDeletedRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListDeletedRequest, ListDeletedResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsListDeletedJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleDocumentsListDeletedProtobuf<T>(
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

function handleDocumentsRestoreRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RestoreRequest, RestoreResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsRestoreJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsRestoreProtobuf<T>(
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

function handleDocumentsPurgeRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, PurgeRequest, PurgeResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsPurgeJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsPurgeProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleDocumentsGetMetaRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetMetaRequest, GetMetaResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsGetMetaJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsGetMetaProtobuf<T>(
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

function handleDocumentsEventlogRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetEventlogRequest, GetEventlogResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsEventlogJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsEventlogProtobuf<T>(
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

function handleDocumentsCompactedEventlogRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetCompactedEventlogRequest,
    GetCompactedEventlogResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsCompactedEventlogJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleDocumentsCompactedEventlogProtobuf<T>(
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

function handleDocumentsGetStatusHistoryRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetStatusHistoryRequest,
    GetStatusHistoryReponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsGetStatusHistoryJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleDocumentsGetStatusHistoryProtobuf<T>(
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

function handleDocumentsGetStatusOverviewRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetStatusOverviewRequest,
    GetStatusOverviewResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsGetStatusOverviewJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleDocumentsGetStatusOverviewProtobuf<T>(
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

function handleDocumentsGetPermissionsRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetPermissionsRequest, GetPermissionsResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsGetPermissionsJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleDocumentsGetPermissionsProtobuf<T>(
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

function handleDocumentsLockRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, LockRequest, LockResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsLockJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsLockProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleDocumentsExtendLockRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ExtendLockRequest, LockResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsExtendLockJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsExtendLockProtobuf<T>(
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

function handleDocumentsUnlockRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UnlockRequest, UnlockResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleDocumentsUnlockJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleDocumentsUnlockProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}
async function handleDocumentsGetJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetDocumentRequest, GetDocumentResponse>[]
) {
  let request: GetDocumentRequest;
  let response: GetDocumentResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetDocumentRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetDocumentRequest,
      GetDocumentResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Get(ctx, inputReq);
    });
  } else {
    response = await service.Get(ctx, request!);
  }

  return JSON.stringify(
    GetDocumentResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsGetHistoryJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetHistoryRequest, GetHistoryResponse>[]
) {
  let request: GetHistoryRequest;
  let response: GetHistoryResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetHistoryRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetHistoryRequest,
      GetHistoryResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetHistory(ctx, inputReq);
    });
  } else {
    response = await service.GetHistory(ctx, request!);
  }

  return JSON.stringify(
    GetHistoryResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsUpdateJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpdateRequest, UpdateResponse>[]
) {
  let request: UpdateRequest;
  let response: UpdateResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = UpdateRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UpdateRequest,
      UpdateResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Update(ctx, inputReq);
    });
  } else {
    response = await service.Update(ctx, request!);
  }

  return JSON.stringify(
    UpdateResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsBulkUpdateJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, BulkUpdateRequest, BulkUpdateResponse>[]
) {
  let request: BulkUpdateRequest;
  let response: BulkUpdateResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = BulkUpdateRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      BulkUpdateRequest,
      BulkUpdateResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.BulkUpdate(ctx, inputReq);
    });
  } else {
    response = await service.BulkUpdate(ctx, request!);
  }

  return JSON.stringify(
    BulkUpdateResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsValidateJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ValidateRequest, ValidateResponse>[]
) {
  let request: ValidateRequest;
  let response: ValidateResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = ValidateRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ValidateRequest,
      ValidateResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Validate(ctx, inputReq);
    });
  } else {
    response = await service.Validate(ctx, request!);
  }

  return JSON.stringify(
    ValidateResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsDeleteJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteDocumentRequest, DeleteDocumentResponse>[]
) {
  let request: DeleteDocumentRequest;
  let response: DeleteDocumentResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = DeleteDocumentRequest.fromJson(body, {
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
      DeleteDocumentRequest,
      DeleteDocumentResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Delete(ctx, inputReq);
    });
  } else {
    response = await service.Delete(ctx, request!);
  }

  return JSON.stringify(
    DeleteDocumentResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsListDeletedJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListDeletedRequest, ListDeletedResponse>[]
) {
  let request: ListDeletedRequest;
  let response: ListDeletedResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = ListDeletedRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ListDeletedRequest,
      ListDeletedResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ListDeleted(ctx, inputReq);
    });
  } else {
    response = await service.ListDeleted(ctx, request!);
  }

  return JSON.stringify(
    ListDeletedResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsRestoreJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RestoreRequest, RestoreResponse>[]
) {
  let request: RestoreRequest;
  let response: RestoreResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = RestoreRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RestoreRequest,
      RestoreResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Restore(ctx, inputReq);
    });
  } else {
    response = await service.Restore(ctx, request!);
  }

  return JSON.stringify(
    RestoreResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsPurgeJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, PurgeRequest, PurgeResponse>[]
) {
  let request: PurgeRequest;
  let response: PurgeResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = PurgeRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      PurgeRequest,
      PurgeResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Purge(ctx, inputReq);
    });
  } else {
    response = await service.Purge(ctx, request!);
  }

  return JSON.stringify(
    PurgeResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsGetMetaJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetMetaRequest, GetMetaResponse>[]
) {
  let request: GetMetaRequest;
  let response: GetMetaResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetMetaRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetMetaRequest,
      GetMetaResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetMeta(ctx, inputReq);
    });
  } else {
    response = await service.GetMeta(ctx, request!);
  }

  return JSON.stringify(
    GetMetaResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsEventlogJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetEventlogRequest, GetEventlogResponse>[]
) {
  let request: GetEventlogRequest;
  let response: GetEventlogResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetEventlogRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetEventlogRequest,
      GetEventlogResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Eventlog(ctx, inputReq);
    });
  } else {
    response = await service.Eventlog(ctx, request!);
  }

  return JSON.stringify(
    GetEventlogResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsCompactedEventlogJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetCompactedEventlogRequest,
    GetCompactedEventlogResponse
  >[]
) {
  let request: GetCompactedEventlogRequest;
  let response: GetCompactedEventlogResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetCompactedEventlogRequest.fromJson(body, {
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
      GetCompactedEventlogRequest,
      GetCompactedEventlogResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CompactedEventlog(ctx, inputReq);
    });
  } else {
    response = await service.CompactedEventlog(ctx, request!);
  }

  return JSON.stringify(
    GetCompactedEventlogResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsGetStatusHistoryJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetStatusHistoryRequest,
    GetStatusHistoryReponse
  >[]
) {
  let request: GetStatusHistoryRequest;
  let response: GetStatusHistoryReponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetStatusHistoryRequest.fromJson(body, {
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
      GetStatusHistoryRequest,
      GetStatusHistoryReponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetStatusHistory(ctx, inputReq);
    });
  } else {
    response = await service.GetStatusHistory(ctx, request!);
  }

  return JSON.stringify(
    GetStatusHistoryReponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsGetStatusOverviewJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetStatusOverviewRequest,
    GetStatusOverviewResponse
  >[]
) {
  let request: GetStatusOverviewRequest;
  let response: GetStatusOverviewResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetStatusOverviewRequest.fromJson(body, {
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
      GetStatusOverviewRequest,
      GetStatusOverviewResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetStatusOverview(ctx, inputReq);
    });
  } else {
    response = await service.GetStatusOverview(ctx, request!);
  }

  return JSON.stringify(
    GetStatusOverviewResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsGetPermissionsJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetPermissionsRequest, GetPermissionsResponse>[]
) {
  let request: GetPermissionsRequest;
  let response: GetPermissionsResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetPermissionsRequest.fromJson(body, {
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
      GetPermissionsRequest,
      GetPermissionsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetPermissions(ctx, inputReq);
    });
  } else {
    response = await service.GetPermissions(ctx, request!);
  }

  return JSON.stringify(
    GetPermissionsResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsLockJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, LockRequest, LockResponse>[]
) {
  let request: LockRequest;
  let response: LockResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = LockRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      LockRequest,
      LockResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Lock(ctx, inputReq);
    });
  } else {
    response = await service.Lock(ctx, request!);
  }

  return JSON.stringify(
    LockResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsExtendLockJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ExtendLockRequest, LockResponse>[]
) {
  let request: ExtendLockRequest;
  let response: LockResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = ExtendLockRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ExtendLockRequest,
      LockResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ExtendLock(ctx, inputReq);
    });
  } else {
    response = await service.ExtendLock(ctx, request!);
  }

  return JSON.stringify(
    LockResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleDocumentsUnlockJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UnlockRequest, UnlockResponse>[]
) {
  let request: UnlockRequest;
  let response: UnlockResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = UnlockRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UnlockRequest,
      UnlockResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Unlock(ctx, inputReq);
    });
  } else {
    response = await service.Unlock(ctx, request!);
  }

  return JSON.stringify(
    UnlockResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleDocumentsGetProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetDocumentRequest, GetDocumentResponse>[]
) {
  let request: GetDocumentRequest;
  let response: GetDocumentResponse;

  try {
    request = GetDocumentRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetDocumentRequest,
      GetDocumentResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Get(ctx, inputReq);
    });
  } else {
    response = await service.Get(ctx, request!);
  }

  return Buffer.from(GetDocumentResponse.toBinary(response));
}

async function handleDocumentsGetHistoryProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetHistoryRequest, GetHistoryResponse>[]
) {
  let request: GetHistoryRequest;
  let response: GetHistoryResponse;

  try {
    request = GetHistoryRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetHistoryRequest,
      GetHistoryResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetHistory(ctx, inputReq);
    });
  } else {
    response = await service.GetHistory(ctx, request!);
  }

  return Buffer.from(GetHistoryResponse.toBinary(response));
}

async function handleDocumentsUpdateProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpdateRequest, UpdateResponse>[]
) {
  let request: UpdateRequest;
  let response: UpdateResponse;

  try {
    request = UpdateRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UpdateRequest,
      UpdateResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Update(ctx, inputReq);
    });
  } else {
    response = await service.Update(ctx, request!);
  }

  return Buffer.from(UpdateResponse.toBinary(response));
}

async function handleDocumentsBulkUpdateProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, BulkUpdateRequest, BulkUpdateResponse>[]
) {
  let request: BulkUpdateRequest;
  let response: BulkUpdateResponse;

  try {
    request = BulkUpdateRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      BulkUpdateRequest,
      BulkUpdateResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.BulkUpdate(ctx, inputReq);
    });
  } else {
    response = await service.BulkUpdate(ctx, request!);
  }

  return Buffer.from(BulkUpdateResponse.toBinary(response));
}

async function handleDocumentsValidateProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ValidateRequest, ValidateResponse>[]
) {
  let request: ValidateRequest;
  let response: ValidateResponse;

  try {
    request = ValidateRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ValidateRequest,
      ValidateResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Validate(ctx, inputReq);
    });
  } else {
    response = await service.Validate(ctx, request!);
  }

  return Buffer.from(ValidateResponse.toBinary(response));
}

async function handleDocumentsDeleteProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteDocumentRequest, DeleteDocumentResponse>[]
) {
  let request: DeleteDocumentRequest;
  let response: DeleteDocumentResponse;

  try {
    request = DeleteDocumentRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteDocumentRequest,
      DeleteDocumentResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Delete(ctx, inputReq);
    });
  } else {
    response = await service.Delete(ctx, request!);
  }

  return Buffer.from(DeleteDocumentResponse.toBinary(response));
}

async function handleDocumentsListDeletedProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListDeletedRequest, ListDeletedResponse>[]
) {
  let request: ListDeletedRequest;
  let response: ListDeletedResponse;

  try {
    request = ListDeletedRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ListDeletedRequest,
      ListDeletedResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ListDeleted(ctx, inputReq);
    });
  } else {
    response = await service.ListDeleted(ctx, request!);
  }

  return Buffer.from(ListDeletedResponse.toBinary(response));
}

async function handleDocumentsRestoreProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RestoreRequest, RestoreResponse>[]
) {
  let request: RestoreRequest;
  let response: RestoreResponse;

  try {
    request = RestoreRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RestoreRequest,
      RestoreResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Restore(ctx, inputReq);
    });
  } else {
    response = await service.Restore(ctx, request!);
  }

  return Buffer.from(RestoreResponse.toBinary(response));
}

async function handleDocumentsPurgeProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, PurgeRequest, PurgeResponse>[]
) {
  let request: PurgeRequest;
  let response: PurgeResponse;

  try {
    request = PurgeRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      PurgeRequest,
      PurgeResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Purge(ctx, inputReq);
    });
  } else {
    response = await service.Purge(ctx, request!);
  }

  return Buffer.from(PurgeResponse.toBinary(response));
}

async function handleDocumentsGetMetaProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetMetaRequest, GetMetaResponse>[]
) {
  let request: GetMetaRequest;
  let response: GetMetaResponse;

  try {
    request = GetMetaRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetMetaRequest,
      GetMetaResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetMeta(ctx, inputReq);
    });
  } else {
    response = await service.GetMeta(ctx, request!);
  }

  return Buffer.from(GetMetaResponse.toBinary(response));
}

async function handleDocumentsEventlogProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetEventlogRequest, GetEventlogResponse>[]
) {
  let request: GetEventlogRequest;
  let response: GetEventlogResponse;

  try {
    request = GetEventlogRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetEventlogRequest,
      GetEventlogResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Eventlog(ctx, inputReq);
    });
  } else {
    response = await service.Eventlog(ctx, request!);
  }

  return Buffer.from(GetEventlogResponse.toBinary(response));
}

async function handleDocumentsCompactedEventlogProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetCompactedEventlogRequest,
    GetCompactedEventlogResponse
  >[]
) {
  let request: GetCompactedEventlogRequest;
  let response: GetCompactedEventlogResponse;

  try {
    request = GetCompactedEventlogRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetCompactedEventlogRequest,
      GetCompactedEventlogResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CompactedEventlog(ctx, inputReq);
    });
  } else {
    response = await service.CompactedEventlog(ctx, request!);
  }

  return Buffer.from(GetCompactedEventlogResponse.toBinary(response));
}

async function handleDocumentsGetStatusHistoryProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetStatusHistoryRequest,
    GetStatusHistoryReponse
  >[]
) {
  let request: GetStatusHistoryRequest;
  let response: GetStatusHistoryReponse;

  try {
    request = GetStatusHistoryRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetStatusHistoryRequest,
      GetStatusHistoryReponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetStatusHistory(ctx, inputReq);
    });
  } else {
    response = await service.GetStatusHistory(ctx, request!);
  }

  return Buffer.from(GetStatusHistoryReponse.toBinary(response));
}

async function handleDocumentsGetStatusOverviewProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetStatusOverviewRequest,
    GetStatusOverviewResponse
  >[]
) {
  let request: GetStatusOverviewRequest;
  let response: GetStatusOverviewResponse;

  try {
    request = GetStatusOverviewRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetStatusOverviewRequest,
      GetStatusOverviewResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetStatusOverview(ctx, inputReq);
    });
  } else {
    response = await service.GetStatusOverview(ctx, request!);
  }

  return Buffer.from(GetStatusOverviewResponse.toBinary(response));
}

async function handleDocumentsGetPermissionsProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetPermissionsRequest, GetPermissionsResponse>[]
) {
  let request: GetPermissionsRequest;
  let response: GetPermissionsResponse;

  try {
    request = GetPermissionsRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetPermissionsRequest,
      GetPermissionsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetPermissions(ctx, inputReq);
    });
  } else {
    response = await service.GetPermissions(ctx, request!);
  }

  return Buffer.from(GetPermissionsResponse.toBinary(response));
}

async function handleDocumentsLockProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, LockRequest, LockResponse>[]
) {
  let request: LockRequest;
  let response: LockResponse;

  try {
    request = LockRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      LockRequest,
      LockResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Lock(ctx, inputReq);
    });
  } else {
    response = await service.Lock(ctx, request!);
  }

  return Buffer.from(LockResponse.toBinary(response));
}

async function handleDocumentsExtendLockProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ExtendLockRequest, LockResponse>[]
) {
  let request: ExtendLockRequest;
  let response: LockResponse;

  try {
    request = ExtendLockRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ExtendLockRequest,
      LockResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ExtendLock(ctx, inputReq);
    });
  } else {
    response = await service.ExtendLock(ctx, request!);
  }

  return Buffer.from(LockResponse.toBinary(response));
}

async function handleDocumentsUnlockProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: DocumentsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UnlockRequest, UnlockResponse>[]
) {
  let request: UnlockRequest;
  let response: UnlockResponse;

  try {
    request = UnlockRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UnlockRequest,
      UnlockResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Unlock(ctx, inputReq);
    });
  } else {
    response = await service.Unlock(ctx, request!);
  }

  return Buffer.from(UnlockResponse.toBinary(response));
}

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

export interface SchemasClient {
  Register(request: RegisterSchemaRequest): Promise<RegisterSchemaResponse>;
  SetActive(request: SetActiveSchemaRequest): Promise<SetActiveSchemaResponse>;
  Get(request: GetSchemaRequest): Promise<GetSchemaResponse>;
  GetAllActive(
    request: GetAllActiveSchemasRequest
  ): Promise<GetAllActiveSchemasResponse>;
  RegisterMetaType(
    request: RegisterMetaTypeRequest
  ): Promise<RegisterMetaTypeResponse>;
  RegisterMetaTypeUse(
    request: RegisterMetaTypeUseRequest
  ): Promise<RegisterMetaTypeUseResponse>;
  GetDeprecations(
    request: GetDeprecationsRequest
  ): Promise<GetDeprecationsResponse>;
  UpdateDeprecation(
    request: UpdateDeprecationRequest
  ): Promise<UpdateDeprecationResponse>;
}

export class SchemasClientJSON implements SchemasClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Register.bind(this);
    this.SetActive.bind(this);
    this.Get.bind(this);
    this.GetAllActive.bind(this);
    this.RegisterMetaType.bind(this);
    this.RegisterMetaTypeUse.bind(this);
    this.GetDeprecations.bind(this);
    this.UpdateDeprecation.bind(this);
  }
  Register(request: RegisterSchemaRequest): Promise<RegisterSchemaResponse> {
    const data = RegisterSchemaRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "Register",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      RegisterSchemaResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  SetActive(request: SetActiveSchemaRequest): Promise<SetActiveSchemaResponse> {
    const data = SetActiveSchemaRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "SetActive",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      SetActiveSchemaResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  Get(request: GetSchemaRequest): Promise<GetSchemaResponse> {
    const data = GetSchemaRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "Get",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetSchemaResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  GetAllActive(
    request: GetAllActiveSchemasRequest
  ): Promise<GetAllActiveSchemasResponse> {
    const data = GetAllActiveSchemasRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "GetAllActive",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetAllActiveSchemasResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  RegisterMetaType(
    request: RegisterMetaTypeRequest
  ): Promise<RegisterMetaTypeResponse> {
    const data = RegisterMetaTypeRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "RegisterMetaType",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      RegisterMetaTypeResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  RegisterMetaTypeUse(
    request: RegisterMetaTypeUseRequest
  ): Promise<RegisterMetaTypeUseResponse> {
    const data = RegisterMetaTypeUseRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "RegisterMetaTypeUse",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      RegisterMetaTypeUseResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetDeprecations(
    request: GetDeprecationsRequest
  ): Promise<GetDeprecationsResponse> {
    const data = GetDeprecationsRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "GetDeprecations",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetDeprecationsResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  UpdateDeprecation(
    request: UpdateDeprecationRequest
  ): Promise<UpdateDeprecationResponse> {
    const data = UpdateDeprecationRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "UpdateDeprecation",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      UpdateDeprecationResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }
}

export class SchemasClientProtobuf implements SchemasClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Register.bind(this);
    this.SetActive.bind(this);
    this.Get.bind(this);
    this.GetAllActive.bind(this);
    this.RegisterMetaType.bind(this);
    this.RegisterMetaTypeUse.bind(this);
    this.GetDeprecations.bind(this);
    this.UpdateDeprecation.bind(this);
  }
  Register(request: RegisterSchemaRequest): Promise<RegisterSchemaResponse> {
    const data = RegisterSchemaRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "Register",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      RegisterSchemaResponse.fromBinary(data as Uint8Array)
    );
  }

  SetActive(request: SetActiveSchemaRequest): Promise<SetActiveSchemaResponse> {
    const data = SetActiveSchemaRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "SetActive",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      SetActiveSchemaResponse.fromBinary(data as Uint8Array)
    );
  }

  Get(request: GetSchemaRequest): Promise<GetSchemaResponse> {
    const data = GetSchemaRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "Get",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetSchemaResponse.fromBinary(data as Uint8Array)
    );
  }

  GetAllActive(
    request: GetAllActiveSchemasRequest
  ): Promise<GetAllActiveSchemasResponse> {
    const data = GetAllActiveSchemasRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "GetAllActive",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetAllActiveSchemasResponse.fromBinary(data as Uint8Array)
    );
  }

  RegisterMetaType(
    request: RegisterMetaTypeRequest
  ): Promise<RegisterMetaTypeResponse> {
    const data = RegisterMetaTypeRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "RegisterMetaType",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      RegisterMetaTypeResponse.fromBinary(data as Uint8Array)
    );
  }

  RegisterMetaTypeUse(
    request: RegisterMetaTypeUseRequest
  ): Promise<RegisterMetaTypeUseResponse> {
    const data = RegisterMetaTypeUseRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "RegisterMetaTypeUse",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      RegisterMetaTypeUseResponse.fromBinary(data as Uint8Array)
    );
  }

  GetDeprecations(
    request: GetDeprecationsRequest
  ): Promise<GetDeprecationsResponse> {
    const data = GetDeprecationsRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "GetDeprecations",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetDeprecationsResponse.fromBinary(data as Uint8Array)
    );
  }

  UpdateDeprecation(
    request: UpdateDeprecationRequest
  ): Promise<UpdateDeprecationResponse> {
    const data = UpdateDeprecationRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Schemas",
      "UpdateDeprecation",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      UpdateDeprecationResponse.fromBinary(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface SchemasTwirp<T extends TwirpContext = TwirpContext> {
  Register(
    ctx: T,
    request: RegisterSchemaRequest
  ): Promise<RegisterSchemaResponse>;
  SetActive(
    ctx: T,
    request: SetActiveSchemaRequest
  ): Promise<SetActiveSchemaResponse>;
  Get(ctx: T, request: GetSchemaRequest): Promise<GetSchemaResponse>;
  GetAllActive(
    ctx: T,
    request: GetAllActiveSchemasRequest
  ): Promise<GetAllActiveSchemasResponse>;
  RegisterMetaType(
    ctx: T,
    request: RegisterMetaTypeRequest
  ): Promise<RegisterMetaTypeResponse>;
  RegisterMetaTypeUse(
    ctx: T,
    request: RegisterMetaTypeUseRequest
  ): Promise<RegisterMetaTypeUseResponse>;
  GetDeprecations(
    ctx: T,
    request: GetDeprecationsRequest
  ): Promise<GetDeprecationsResponse>;
  UpdateDeprecation(
    ctx: T,
    request: UpdateDeprecationRequest
  ): Promise<UpdateDeprecationResponse>;
}

export enum SchemasMethod {
  Register = "Register",
  SetActive = "SetActive",
  Get = "Get",
  GetAllActive = "GetAllActive",
  RegisterMetaType = "RegisterMetaType",
  RegisterMetaTypeUse = "RegisterMetaTypeUse",
  GetDeprecations = "GetDeprecations",
  UpdateDeprecation = "UpdateDeprecation",
}

export const SchemasMethodList = [
  SchemasMethod.Register,
  SchemasMethod.SetActive,
  SchemasMethod.Get,
  SchemasMethod.GetAllActive,
  SchemasMethod.RegisterMetaType,
  SchemasMethod.RegisterMetaTypeUse,
  SchemasMethod.GetDeprecations,
  SchemasMethod.UpdateDeprecation,
];

export function createSchemasServer<T extends TwirpContext = TwirpContext>(
  service: SchemasTwirp<T>
) {
  return new TwirpServer<SchemasTwirp, T>({
    service,
    packageName: "elephant.repository",
    serviceName: "Schemas",
    methodList: SchemasMethodList,
    matchRoute: matchSchemasRoute,
  });
}

function matchSchemasRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "Register":
      return async (
        ctx: T,
        service: SchemasTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          RegisterSchemaRequest,
          RegisterSchemaResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "Register" };
        await events.onMatch(ctx);
        return handleSchemasRegisterRequest(ctx, service, data, interceptors);
      };
    case "SetActive":
      return async (
        ctx: T,
        service: SchemasTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          SetActiveSchemaRequest,
          SetActiveSchemaResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "SetActive" };
        await events.onMatch(ctx);
        return handleSchemasSetActiveRequest(ctx, service, data, interceptors);
      };
    case "Get":
      return async (
        ctx: T,
        service: SchemasTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, GetSchemaRequest, GetSchemaResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Get" };
        await events.onMatch(ctx);
        return handleSchemasGetRequest(ctx, service, data, interceptors);
      };
    case "GetAllActive":
      return async (
        ctx: T,
        service: SchemasTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetAllActiveSchemasRequest,
          GetAllActiveSchemasResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetAllActive" };
        await events.onMatch(ctx);
        return handleSchemasGetAllActiveRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "RegisterMetaType":
      return async (
        ctx: T,
        service: SchemasTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          RegisterMetaTypeRequest,
          RegisterMetaTypeResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "RegisterMetaType" };
        await events.onMatch(ctx);
        return handleSchemasRegisterMetaTypeRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "RegisterMetaTypeUse":
      return async (
        ctx: T,
        service: SchemasTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          RegisterMetaTypeUseRequest,
          RegisterMetaTypeUseResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "RegisterMetaTypeUse" };
        await events.onMatch(ctx);
        return handleSchemasRegisterMetaTypeUseRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetDeprecations":
      return async (
        ctx: T,
        service: SchemasTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetDeprecationsRequest,
          GetDeprecationsResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetDeprecations" };
        await events.onMatch(ctx);
        return handleSchemasGetDeprecationsRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "UpdateDeprecation":
      return async (
        ctx: T,
        service: SchemasTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          UpdateDeprecationRequest,
          UpdateDeprecationResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "UpdateDeprecation" };
        await events.onMatch(ctx);
        return handleSchemasUpdateDeprecationRequest(
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

function handleSchemasRegisterRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RegisterSchemaRequest, RegisterSchemaResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleSchemasRegisterJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleSchemasRegisterProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleSchemasSetActiveRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SetActiveSchemaRequest,
    SetActiveSchemaResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleSchemasSetActiveJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleSchemasSetActiveProtobuf<T>(
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

function handleSchemasGetRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetSchemaRequest, GetSchemaResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleSchemasGetJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleSchemasGetProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleSchemasGetAllActiveRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAllActiveSchemasRequest,
    GetAllActiveSchemasResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleSchemasGetAllActiveJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleSchemasGetAllActiveProtobuf<T>(
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

function handleSchemasRegisterMetaTypeRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterMetaTypeRequest,
    RegisterMetaTypeResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleSchemasRegisterMetaTypeJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleSchemasRegisterMetaTypeProtobuf<T>(
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

function handleSchemasRegisterMetaTypeUseRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterMetaTypeUseRequest,
    RegisterMetaTypeUseResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleSchemasRegisterMetaTypeUseJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleSchemasRegisterMetaTypeUseProtobuf<T>(
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

function handleSchemasGetDeprecationsRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetDeprecationsRequest,
    GetDeprecationsResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleSchemasGetDeprecationsJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleSchemasGetDeprecationsProtobuf<T>(
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

function handleSchemasUpdateDeprecationRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    UpdateDeprecationRequest,
    UpdateDeprecationResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleSchemasUpdateDeprecationJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleSchemasUpdateDeprecationProtobuf<T>(
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
async function handleSchemasRegisterJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RegisterSchemaRequest, RegisterSchemaResponse>[]
) {
  let request: RegisterSchemaRequest;
  let response: RegisterSchemaResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = RegisterSchemaRequest.fromJson(body, {
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
      RegisterSchemaRequest,
      RegisterSchemaResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Register(ctx, inputReq);
    });
  } else {
    response = await service.Register(ctx, request!);
  }

  return JSON.stringify(
    RegisterSchemaResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleSchemasSetActiveJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SetActiveSchemaRequest,
    SetActiveSchemaResponse
  >[]
) {
  let request: SetActiveSchemaRequest;
  let response: SetActiveSchemaResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SetActiveSchemaRequest.fromJson(body, {
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
      SetActiveSchemaRequest,
      SetActiveSchemaResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SetActive(ctx, inputReq);
    });
  } else {
    response = await service.SetActive(ctx, request!);
  }

  return JSON.stringify(
    SetActiveSchemaResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleSchemasGetJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetSchemaRequest, GetSchemaResponse>[]
) {
  let request: GetSchemaRequest;
  let response: GetSchemaResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetSchemaRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetSchemaRequest,
      GetSchemaResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Get(ctx, inputReq);
    });
  } else {
    response = await service.Get(ctx, request!);
  }

  return JSON.stringify(
    GetSchemaResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleSchemasGetAllActiveJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAllActiveSchemasRequest,
    GetAllActiveSchemasResponse
  >[]
) {
  let request: GetAllActiveSchemasRequest;
  let response: GetAllActiveSchemasResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetAllActiveSchemasRequest.fromJson(body, {
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
      GetAllActiveSchemasRequest,
      GetAllActiveSchemasResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetAllActive(ctx, inputReq);
    });
  } else {
    response = await service.GetAllActive(ctx, request!);
  }

  return JSON.stringify(
    GetAllActiveSchemasResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleSchemasRegisterMetaTypeJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterMetaTypeRequest,
    RegisterMetaTypeResponse
  >[]
) {
  let request: RegisterMetaTypeRequest;
  let response: RegisterMetaTypeResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = RegisterMetaTypeRequest.fromJson(body, {
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
      RegisterMetaTypeRequest,
      RegisterMetaTypeResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterMetaType(ctx, inputReq);
    });
  } else {
    response = await service.RegisterMetaType(ctx, request!);
  }

  return JSON.stringify(
    RegisterMetaTypeResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleSchemasRegisterMetaTypeUseJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterMetaTypeUseRequest,
    RegisterMetaTypeUseResponse
  >[]
) {
  let request: RegisterMetaTypeUseRequest;
  let response: RegisterMetaTypeUseResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = RegisterMetaTypeUseRequest.fromJson(body, {
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
      RegisterMetaTypeUseRequest,
      RegisterMetaTypeUseResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterMetaTypeUse(ctx, inputReq);
    });
  } else {
    response = await service.RegisterMetaTypeUse(ctx, request!);
  }

  return JSON.stringify(
    RegisterMetaTypeUseResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleSchemasGetDeprecationsJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetDeprecationsRequest,
    GetDeprecationsResponse
  >[]
) {
  let request: GetDeprecationsRequest;
  let response: GetDeprecationsResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetDeprecationsRequest.fromJson(body, {
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
      GetDeprecationsRequest,
      GetDeprecationsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetDeprecations(ctx, inputReq);
    });
  } else {
    response = await service.GetDeprecations(ctx, request!);
  }

  return JSON.stringify(
    GetDeprecationsResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleSchemasUpdateDeprecationJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    UpdateDeprecationRequest,
    UpdateDeprecationResponse
  >[]
) {
  let request: UpdateDeprecationRequest;
  let response: UpdateDeprecationResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = UpdateDeprecationRequest.fromJson(body, {
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
      UpdateDeprecationRequest,
      UpdateDeprecationResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.UpdateDeprecation(ctx, inputReq);
    });
  } else {
    response = await service.UpdateDeprecation(ctx, request!);
  }

  return JSON.stringify(
    UpdateDeprecationResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleSchemasRegisterProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RegisterSchemaRequest, RegisterSchemaResponse>[]
) {
  let request: RegisterSchemaRequest;
  let response: RegisterSchemaResponse;

  try {
    request = RegisterSchemaRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RegisterSchemaRequest,
      RegisterSchemaResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Register(ctx, inputReq);
    });
  } else {
    response = await service.Register(ctx, request!);
  }

  return Buffer.from(RegisterSchemaResponse.toBinary(response));
}

async function handleSchemasSetActiveProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SetActiveSchemaRequest,
    SetActiveSchemaResponse
  >[]
) {
  let request: SetActiveSchemaRequest;
  let response: SetActiveSchemaResponse;

  try {
    request = SetActiveSchemaRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SetActiveSchemaRequest,
      SetActiveSchemaResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SetActive(ctx, inputReq);
    });
  } else {
    response = await service.SetActive(ctx, request!);
  }

  return Buffer.from(SetActiveSchemaResponse.toBinary(response));
}

async function handleSchemasGetProtobuf<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetSchemaRequest, GetSchemaResponse>[]
) {
  let request: GetSchemaRequest;
  let response: GetSchemaResponse;

  try {
    request = GetSchemaRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetSchemaRequest,
      GetSchemaResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Get(ctx, inputReq);
    });
  } else {
    response = await service.Get(ctx, request!);
  }

  return Buffer.from(GetSchemaResponse.toBinary(response));
}

async function handleSchemasGetAllActiveProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAllActiveSchemasRequest,
    GetAllActiveSchemasResponse
  >[]
) {
  let request: GetAllActiveSchemasRequest;
  let response: GetAllActiveSchemasResponse;

  try {
    request = GetAllActiveSchemasRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetAllActiveSchemasRequest,
      GetAllActiveSchemasResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetAllActive(ctx, inputReq);
    });
  } else {
    response = await service.GetAllActive(ctx, request!);
  }

  return Buffer.from(GetAllActiveSchemasResponse.toBinary(response));
}

async function handleSchemasRegisterMetaTypeProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterMetaTypeRequest,
    RegisterMetaTypeResponse
  >[]
) {
  let request: RegisterMetaTypeRequest;
  let response: RegisterMetaTypeResponse;

  try {
    request = RegisterMetaTypeRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RegisterMetaTypeRequest,
      RegisterMetaTypeResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterMetaType(ctx, inputReq);
    });
  } else {
    response = await service.RegisterMetaType(ctx, request!);
  }

  return Buffer.from(RegisterMetaTypeResponse.toBinary(response));
}

async function handleSchemasRegisterMetaTypeUseProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterMetaTypeUseRequest,
    RegisterMetaTypeUseResponse
  >[]
) {
  let request: RegisterMetaTypeUseRequest;
  let response: RegisterMetaTypeUseResponse;

  try {
    request = RegisterMetaTypeUseRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RegisterMetaTypeUseRequest,
      RegisterMetaTypeUseResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterMetaTypeUse(ctx, inputReq);
    });
  } else {
    response = await service.RegisterMetaTypeUse(ctx, request!);
  }

  return Buffer.from(RegisterMetaTypeUseResponse.toBinary(response));
}

async function handleSchemasGetDeprecationsProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetDeprecationsRequest,
    GetDeprecationsResponse
  >[]
) {
  let request: GetDeprecationsRequest;
  let response: GetDeprecationsResponse;

  try {
    request = GetDeprecationsRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetDeprecationsRequest,
      GetDeprecationsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetDeprecations(ctx, inputReq);
    });
  } else {
    response = await service.GetDeprecations(ctx, request!);
  }

  return Buffer.from(GetDeprecationsResponse.toBinary(response));
}

async function handleSchemasUpdateDeprecationProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: SchemasTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    UpdateDeprecationRequest,
    UpdateDeprecationResponse
  >[]
) {
  let request: UpdateDeprecationRequest;
  let response: UpdateDeprecationResponse;

  try {
    request = UpdateDeprecationRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UpdateDeprecationRequest,
      UpdateDeprecationResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.UpdateDeprecation(ctx, inputReq);
    });
  } else {
    response = await service.UpdateDeprecation(ctx, request!);
  }

  return Buffer.from(UpdateDeprecationResponse.toBinary(response));
}

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

export interface WorkflowsClient {
  UpdateStatus(request: UpdateStatusRequest): Promise<UpdateStatusResponse>;
  GetStatuses(request: GetStatusesRequest): Promise<GetStatusesResponse>;
  CreateStatusRule(
    request: CreateStatusRuleRequest
  ): Promise<CreateStatusRuleResponse>;
  DeleteStatusRule(
    request: DeleteStatusRuleRequest
  ): Promise<DeleteStatusRuleResponse>;
  GetStatusRules(
    request: GetStatusRulesRequest
  ): Promise<GetStatusRulesResponse>;
}

export class WorkflowsClientJSON implements WorkflowsClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpdateStatus.bind(this);
    this.GetStatuses.bind(this);
    this.CreateStatusRule.bind(this);
    this.DeleteStatusRule.bind(this);
    this.GetStatusRules.bind(this);
  }
  UpdateStatus(request: UpdateStatusRequest): Promise<UpdateStatusResponse> {
    const data = UpdateStatusRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "UpdateStatus",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      UpdateStatusResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  GetStatuses(request: GetStatusesRequest): Promise<GetStatusesResponse> {
    const data = GetStatusesRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "GetStatuses",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetStatusesResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  CreateStatusRule(
    request: CreateStatusRuleRequest
  ): Promise<CreateStatusRuleResponse> {
    const data = CreateStatusRuleRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "CreateStatusRule",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      CreateStatusRuleResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  DeleteStatusRule(
    request: DeleteStatusRuleRequest
  ): Promise<DeleteStatusRuleResponse> {
    const data = DeleteStatusRuleRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "DeleteStatusRule",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      DeleteStatusRuleResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetStatusRules(
    request: GetStatusRulesRequest
  ): Promise<GetStatusRulesResponse> {
    const data = GetStatusRulesRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "GetStatusRules",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetStatusRulesResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }
}

export class WorkflowsClientProtobuf implements WorkflowsClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpdateStatus.bind(this);
    this.GetStatuses.bind(this);
    this.CreateStatusRule.bind(this);
    this.DeleteStatusRule.bind(this);
    this.GetStatusRules.bind(this);
  }
  UpdateStatus(request: UpdateStatusRequest): Promise<UpdateStatusResponse> {
    const data = UpdateStatusRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "UpdateStatus",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      UpdateStatusResponse.fromBinary(data as Uint8Array)
    );
  }

  GetStatuses(request: GetStatusesRequest): Promise<GetStatusesResponse> {
    const data = GetStatusesRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "GetStatuses",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetStatusesResponse.fromBinary(data as Uint8Array)
    );
  }

  CreateStatusRule(
    request: CreateStatusRuleRequest
  ): Promise<CreateStatusRuleResponse> {
    const data = CreateStatusRuleRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "CreateStatusRule",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      CreateStatusRuleResponse.fromBinary(data as Uint8Array)
    );
  }

  DeleteStatusRule(
    request: DeleteStatusRuleRequest
  ): Promise<DeleteStatusRuleResponse> {
    const data = DeleteStatusRuleRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "DeleteStatusRule",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      DeleteStatusRuleResponse.fromBinary(data as Uint8Array)
    );
  }

  GetStatusRules(
    request: GetStatusRulesRequest
  ): Promise<GetStatusRulesResponse> {
    const data = GetStatusRulesRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Workflows",
      "GetStatusRules",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetStatusRulesResponse.fromBinary(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface WorkflowsTwirp<T extends TwirpContext = TwirpContext> {
  UpdateStatus(
    ctx: T,
    request: UpdateStatusRequest
  ): Promise<UpdateStatusResponse>;
  GetStatuses(
    ctx: T,
    request: GetStatusesRequest
  ): Promise<GetStatusesResponse>;
  CreateStatusRule(
    ctx: T,
    request: CreateStatusRuleRequest
  ): Promise<CreateStatusRuleResponse>;
  DeleteStatusRule(
    ctx: T,
    request: DeleteStatusRuleRequest
  ): Promise<DeleteStatusRuleResponse>;
  GetStatusRules(
    ctx: T,
    request: GetStatusRulesRequest
  ): Promise<GetStatusRulesResponse>;
}

export enum WorkflowsMethod {
  UpdateStatus = "UpdateStatus",
  GetStatuses = "GetStatuses",
  CreateStatusRule = "CreateStatusRule",
  DeleteStatusRule = "DeleteStatusRule",
  GetStatusRules = "GetStatusRules",
}

export const WorkflowsMethodList = [
  WorkflowsMethod.UpdateStatus,
  WorkflowsMethod.GetStatuses,
  WorkflowsMethod.CreateStatusRule,
  WorkflowsMethod.DeleteStatusRule,
  WorkflowsMethod.GetStatusRules,
];

export function createWorkflowsServer<T extends TwirpContext = TwirpContext>(
  service: WorkflowsTwirp<T>
) {
  return new TwirpServer<WorkflowsTwirp, T>({
    service,
    packageName: "elephant.repository",
    serviceName: "Workflows",
    methodList: WorkflowsMethodList,
    matchRoute: matchWorkflowsRoute,
  });
}

function matchWorkflowsRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "UpdateStatus":
      return async (
        ctx: T,
        service: WorkflowsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          UpdateStatusRequest,
          UpdateStatusResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "UpdateStatus" };
        await events.onMatch(ctx);
        return handleWorkflowsUpdateStatusRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetStatuses":
      return async (
        ctx: T,
        service: WorkflowsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, GetStatusesRequest, GetStatusesResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "GetStatuses" };
        await events.onMatch(ctx);
        return handleWorkflowsGetStatusesRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "CreateStatusRule":
      return async (
        ctx: T,
        service: WorkflowsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          CreateStatusRuleRequest,
          CreateStatusRuleResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "CreateStatusRule" };
        await events.onMatch(ctx);
        return handleWorkflowsCreateStatusRuleRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "DeleteStatusRule":
      return async (
        ctx: T,
        service: WorkflowsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          DeleteStatusRuleRequest,
          DeleteStatusRuleResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "DeleteStatusRule" };
        await events.onMatch(ctx);
        return handleWorkflowsDeleteStatusRuleRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetStatusRules":
      return async (
        ctx: T,
        service: WorkflowsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetStatusRulesRequest,
          GetStatusRulesResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetStatusRules" };
        await events.onMatch(ctx);
        return handleWorkflowsGetStatusRulesRequest(
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

function handleWorkflowsUpdateStatusRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpdateStatusRequest, UpdateStatusResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleWorkflowsUpdateStatusJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleWorkflowsUpdateStatusProtobuf<T>(
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

function handleWorkflowsGetStatusesRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetStatusesRequest, GetStatusesResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleWorkflowsGetStatusesJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleWorkflowsGetStatusesProtobuf<T>(
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

function handleWorkflowsCreateStatusRuleRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateStatusRuleRequest,
    CreateStatusRuleResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleWorkflowsCreateStatusRuleJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleWorkflowsCreateStatusRuleProtobuf<T>(
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

function handleWorkflowsDeleteStatusRuleRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    DeleteStatusRuleRequest,
    DeleteStatusRuleResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleWorkflowsDeleteStatusRuleJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleWorkflowsDeleteStatusRuleProtobuf<T>(
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

function handleWorkflowsGetStatusRulesRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetStatusRulesRequest, GetStatusRulesResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleWorkflowsGetStatusRulesJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleWorkflowsGetStatusRulesProtobuf<T>(
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
async function handleWorkflowsUpdateStatusJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpdateStatusRequest, UpdateStatusResponse>[]
) {
  let request: UpdateStatusRequest;
  let response: UpdateStatusResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = UpdateStatusRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UpdateStatusRequest,
      UpdateStatusResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.UpdateStatus(ctx, inputReq);
    });
  } else {
    response = await service.UpdateStatus(ctx, request!);
  }

  return JSON.stringify(
    UpdateStatusResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleWorkflowsGetStatusesJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetStatusesRequest, GetStatusesResponse>[]
) {
  let request: GetStatusesRequest;
  let response: GetStatusesResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetStatusesRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetStatusesRequest,
      GetStatusesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetStatuses(ctx, inputReq);
    });
  } else {
    response = await service.GetStatuses(ctx, request!);
  }

  return JSON.stringify(
    GetStatusesResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleWorkflowsCreateStatusRuleJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateStatusRuleRequest,
    CreateStatusRuleResponse
  >[]
) {
  let request: CreateStatusRuleRequest;
  let response: CreateStatusRuleResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = CreateStatusRuleRequest.fromJson(body, {
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
      CreateStatusRuleRequest,
      CreateStatusRuleResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateStatusRule(ctx, inputReq);
    });
  } else {
    response = await service.CreateStatusRule(ctx, request!);
  }

  return JSON.stringify(
    CreateStatusRuleResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleWorkflowsDeleteStatusRuleJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    DeleteStatusRuleRequest,
    DeleteStatusRuleResponse
  >[]
) {
  let request: DeleteStatusRuleRequest;
  let response: DeleteStatusRuleResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = DeleteStatusRuleRequest.fromJson(body, {
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
      DeleteStatusRuleRequest,
      DeleteStatusRuleResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteStatusRule(ctx, inputReq);
    });
  } else {
    response = await service.DeleteStatusRule(ctx, request!);
  }

  return JSON.stringify(
    DeleteStatusRuleResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleWorkflowsGetStatusRulesJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetStatusRulesRequest, GetStatusRulesResponse>[]
) {
  let request: GetStatusRulesRequest;
  let response: GetStatusRulesResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetStatusRulesRequest.fromJson(body, {
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
      GetStatusRulesRequest,
      GetStatusRulesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetStatusRules(ctx, inputReq);
    });
  } else {
    response = await service.GetStatusRules(ctx, request!);
  }

  return JSON.stringify(
    GetStatusRulesResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleWorkflowsUpdateStatusProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpdateStatusRequest, UpdateStatusResponse>[]
) {
  let request: UpdateStatusRequest;
  let response: UpdateStatusResponse;

  try {
    request = UpdateStatusRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UpdateStatusRequest,
      UpdateStatusResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.UpdateStatus(ctx, inputReq);
    });
  } else {
    response = await service.UpdateStatus(ctx, request!);
  }

  return Buffer.from(UpdateStatusResponse.toBinary(response));
}

async function handleWorkflowsGetStatusesProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetStatusesRequest, GetStatusesResponse>[]
) {
  let request: GetStatusesRequest;
  let response: GetStatusesResponse;

  try {
    request = GetStatusesRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetStatusesRequest,
      GetStatusesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetStatuses(ctx, inputReq);
    });
  } else {
    response = await service.GetStatuses(ctx, request!);
  }

  return Buffer.from(GetStatusesResponse.toBinary(response));
}

async function handleWorkflowsCreateStatusRuleProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateStatusRuleRequest,
    CreateStatusRuleResponse
  >[]
) {
  let request: CreateStatusRuleRequest;
  let response: CreateStatusRuleResponse;

  try {
    request = CreateStatusRuleRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      CreateStatusRuleRequest,
      CreateStatusRuleResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateStatusRule(ctx, inputReq);
    });
  } else {
    response = await service.CreateStatusRule(ctx, request!);
  }

  return Buffer.from(CreateStatusRuleResponse.toBinary(response));
}

async function handleWorkflowsDeleteStatusRuleProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    DeleteStatusRuleRequest,
    DeleteStatusRuleResponse
  >[]
) {
  let request: DeleteStatusRuleRequest;
  let response: DeleteStatusRuleResponse;

  try {
    request = DeleteStatusRuleRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteStatusRuleRequest,
      DeleteStatusRuleResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteStatusRule(ctx, inputReq);
    });
  } else {
    response = await service.DeleteStatusRule(ctx, request!);
  }

  return Buffer.from(DeleteStatusRuleResponse.toBinary(response));
}

async function handleWorkflowsGetStatusRulesProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WorkflowsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetStatusRulesRequest, GetStatusRulesResponse>[]
) {
  let request: GetStatusRulesRequest;
  let response: GetStatusRulesResponse;

  try {
    request = GetStatusRulesRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetStatusRulesRequest,
      GetStatusRulesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetStatusRules(ctx, inputReq);
    });
  } else {
    response = await service.GetStatusRules(ctx, request!);
  }

  return Buffer.from(GetStatusRulesResponse.toBinary(response));
}

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

export interface ReportsClient {
  List(request: ListReportsRequest): Promise<ListReportsResponse>;
  Update(request: UpdateReportRequest): Promise<UpdateReportResponse>;
  Get(request: GetReportRequest): Promise<GetReportResponse>;
  Delete(request: DeleteReportRequest): Promise<DeleteReportResponse>;
  Run(request: RunReportRequest): Promise<RunReportResponse>;
  Test(request: TestReportRequest): Promise<TestReportResponse>;
}

export class ReportsClientJSON implements ReportsClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.List.bind(this);
    this.Update.bind(this);
    this.Get.bind(this);
    this.Delete.bind(this);
    this.Run.bind(this);
    this.Test.bind(this);
  }
  List(request: ListReportsRequest): Promise<ListReportsResponse> {
    const data = ListReportsRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "List",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      ListReportsResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Update(request: UpdateReportRequest): Promise<UpdateReportResponse> {
    const data = UpdateReportRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Update",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      UpdateReportResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Get(request: GetReportRequest): Promise<GetReportResponse> {
    const data = GetReportRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Get",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetReportResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Delete(request: DeleteReportRequest): Promise<DeleteReportResponse> {
    const data = DeleteReportRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Delete",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      DeleteReportResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Run(request: RunReportRequest): Promise<RunReportResponse> {
    const data = RunReportRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Run",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      RunReportResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Test(request: TestReportRequest): Promise<TestReportResponse> {
    const data = TestReportRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Test",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      TestReportResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }
}

export class ReportsClientProtobuf implements ReportsClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.List.bind(this);
    this.Update.bind(this);
    this.Get.bind(this);
    this.Delete.bind(this);
    this.Run.bind(this);
    this.Test.bind(this);
  }
  List(request: ListReportsRequest): Promise<ListReportsResponse> {
    const data = ListReportsRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "List",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      ListReportsResponse.fromBinary(data as Uint8Array)
    );
  }

  Update(request: UpdateReportRequest): Promise<UpdateReportResponse> {
    const data = UpdateReportRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Update",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      UpdateReportResponse.fromBinary(data as Uint8Array)
    );
  }

  Get(request: GetReportRequest): Promise<GetReportResponse> {
    const data = GetReportRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Get",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetReportResponse.fromBinary(data as Uint8Array)
    );
  }

  Delete(request: DeleteReportRequest): Promise<DeleteReportResponse> {
    const data = DeleteReportRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Delete",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      DeleteReportResponse.fromBinary(data as Uint8Array)
    );
  }

  Run(request: RunReportRequest): Promise<RunReportResponse> {
    const data = RunReportRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Run",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      RunReportResponse.fromBinary(data as Uint8Array)
    );
  }

  Test(request: TestReportRequest): Promise<TestReportResponse> {
    const data = TestReportRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Reports",
      "Test",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      TestReportResponse.fromBinary(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface ReportsTwirp<T extends TwirpContext = TwirpContext> {
  List(ctx: T, request: ListReportsRequest): Promise<ListReportsResponse>;
  Update(ctx: T, request: UpdateReportRequest): Promise<UpdateReportResponse>;
  Get(ctx: T, request: GetReportRequest): Promise<GetReportResponse>;
  Delete(ctx: T, request: DeleteReportRequest): Promise<DeleteReportResponse>;
  Run(ctx: T, request: RunReportRequest): Promise<RunReportResponse>;
  Test(ctx: T, request: TestReportRequest): Promise<TestReportResponse>;
}

export enum ReportsMethod {
  List = "List",
  Update = "Update",
  Get = "Get",
  Delete = "Delete",
  Run = "Run",
  Test = "Test",
}

export const ReportsMethodList = [
  ReportsMethod.List,
  ReportsMethod.Update,
  ReportsMethod.Get,
  ReportsMethod.Delete,
  ReportsMethod.Run,
  ReportsMethod.Test,
];

export function createReportsServer<T extends TwirpContext = TwirpContext>(
  service: ReportsTwirp<T>
) {
  return new TwirpServer<ReportsTwirp, T>({
    service,
    packageName: "elephant.repository",
    serviceName: "Reports",
    methodList: ReportsMethodList,
    matchRoute: matchReportsRoute,
  });
}

function matchReportsRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "List":
      return async (
        ctx: T,
        service: ReportsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, ListReportsRequest, ListReportsResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "List" };
        await events.onMatch(ctx);
        return handleReportsListRequest(ctx, service, data, interceptors);
      };
    case "Update":
      return async (
        ctx: T,
        service: ReportsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          UpdateReportRequest,
          UpdateReportResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "Update" };
        await events.onMatch(ctx);
        return handleReportsUpdateRequest(ctx, service, data, interceptors);
      };
    case "Get":
      return async (
        ctx: T,
        service: ReportsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, GetReportRequest, GetReportResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Get" };
        await events.onMatch(ctx);
        return handleReportsGetRequest(ctx, service, data, interceptors);
      };
    case "Delete":
      return async (
        ctx: T,
        service: ReportsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          DeleteReportRequest,
          DeleteReportResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "Delete" };
        await events.onMatch(ctx);
        return handleReportsDeleteRequest(ctx, service, data, interceptors);
      };
    case "Run":
      return async (
        ctx: T,
        service: ReportsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, RunReportRequest, RunReportResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Run" };
        await events.onMatch(ctx);
        return handleReportsRunRequest(ctx, service, data, interceptors);
      };
    case "Test":
      return async (
        ctx: T,
        service: ReportsTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, TestReportRequest, TestReportResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Test" };
        await events.onMatch(ctx);
        return handleReportsTestRequest(ctx, service, data, interceptors);
      };
    default:
      events.onNotFound();
      const msg = `no handler found`;
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleReportsListRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListReportsRequest, ListReportsResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleReportsListJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleReportsListProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleReportsUpdateRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpdateReportRequest, UpdateReportResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleReportsUpdateJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleReportsUpdateProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleReportsGetRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetReportRequest, GetReportResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleReportsGetJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleReportsGetProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleReportsDeleteRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteReportRequest, DeleteReportResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleReportsDeleteJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleReportsDeleteProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleReportsRunRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RunReportRequest, RunReportResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleReportsRunJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleReportsRunProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleReportsTestRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, TestReportRequest, TestReportResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleReportsTestJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleReportsTestProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}
async function handleReportsListJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListReportsRequest, ListReportsResponse>[]
) {
  let request: ListReportsRequest;
  let response: ListReportsResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = ListReportsRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ListReportsRequest,
      ListReportsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.List(ctx, inputReq);
    });
  } else {
    response = await service.List(ctx, request!);
  }

  return JSON.stringify(
    ListReportsResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleReportsUpdateJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpdateReportRequest, UpdateReportResponse>[]
) {
  let request: UpdateReportRequest;
  let response: UpdateReportResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = UpdateReportRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UpdateReportRequest,
      UpdateReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Update(ctx, inputReq);
    });
  } else {
    response = await service.Update(ctx, request!);
  }

  return JSON.stringify(
    UpdateReportResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleReportsGetJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetReportRequest, GetReportResponse>[]
) {
  let request: GetReportRequest;
  let response: GetReportResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetReportRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetReportRequest,
      GetReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Get(ctx, inputReq);
    });
  } else {
    response = await service.Get(ctx, request!);
  }

  return JSON.stringify(
    GetReportResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleReportsDeleteJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteReportRequest, DeleteReportResponse>[]
) {
  let request: DeleteReportRequest;
  let response: DeleteReportResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = DeleteReportRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteReportRequest,
      DeleteReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Delete(ctx, inputReq);
    });
  } else {
    response = await service.Delete(ctx, request!);
  }

  return JSON.stringify(
    DeleteReportResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleReportsRunJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RunReportRequest, RunReportResponse>[]
) {
  let request: RunReportRequest;
  let response: RunReportResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = RunReportRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RunReportRequest,
      RunReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Run(ctx, inputReq);
    });
  } else {
    response = await service.Run(ctx, request!);
  }

  return JSON.stringify(
    RunReportResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleReportsTestJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, TestReportRequest, TestReportResponse>[]
) {
  let request: TestReportRequest;
  let response: TestReportResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = TestReportRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      TestReportRequest,
      TestReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Test(ctx, inputReq);
    });
  } else {
    response = await service.Test(ctx, request!);
  }

  return JSON.stringify(
    TestReportResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleReportsListProtobuf<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ListReportsRequest, ListReportsResponse>[]
) {
  let request: ListReportsRequest;
  let response: ListReportsResponse;

  try {
    request = ListReportsRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ListReportsRequest,
      ListReportsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.List(ctx, inputReq);
    });
  } else {
    response = await service.List(ctx, request!);
  }

  return Buffer.from(ListReportsResponse.toBinary(response));
}

async function handleReportsUpdateProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpdateReportRequest, UpdateReportResponse>[]
) {
  let request: UpdateReportRequest;
  let response: UpdateReportResponse;

  try {
    request = UpdateReportRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UpdateReportRequest,
      UpdateReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Update(ctx, inputReq);
    });
  } else {
    response = await service.Update(ctx, request!);
  }

  return Buffer.from(UpdateReportResponse.toBinary(response));
}

async function handleReportsGetProtobuf<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetReportRequest, GetReportResponse>[]
) {
  let request: GetReportRequest;
  let response: GetReportResponse;

  try {
    request = GetReportRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetReportRequest,
      GetReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Get(ctx, inputReq);
    });
  } else {
    response = await service.Get(ctx, request!);
  }

  return Buffer.from(GetReportResponse.toBinary(response));
}

async function handleReportsDeleteProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteReportRequest, DeleteReportResponse>[]
) {
  let request: DeleteReportRequest;
  let response: DeleteReportResponse;

  try {
    request = DeleteReportRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteReportRequest,
      DeleteReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Delete(ctx, inputReq);
    });
  } else {
    response = await service.Delete(ctx, request!);
  }

  return Buffer.from(DeleteReportResponse.toBinary(response));
}

async function handleReportsRunProtobuf<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RunReportRequest, RunReportResponse>[]
) {
  let request: RunReportRequest;
  let response: RunReportResponse;

  try {
    request = RunReportRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RunReportRequest,
      RunReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Run(ctx, inputReq);
    });
  } else {
    response = await service.Run(ctx, request!);
  }

  return Buffer.from(RunReportResponse.toBinary(response));
}

async function handleReportsTestProtobuf<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ReportsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, TestReportRequest, TestReportResponse>[]
) {
  let request: TestReportRequest;
  let response: TestReportResponse;

  try {
    request = TestReportRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      TestReportRequest,
      TestReportResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Test(ctx, inputReq);
    });
  } else {
    response = await service.Test(ctx, request!);
  }

  return Buffer.from(TestReportResponse.toBinary(response));
}

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

export interface MetricsClient {
  RegisterKind(
    request: RegisterMetricKindRequest
  ): Promise<RegisterMetricKindResponse>;
  DeleteKind(
    request: DeleteMetricKindRequest
  ): Promise<DeleteMetricKindResponse>;
  GetKinds(request: GetMetricKindsRequest): Promise<GetMetricKindsResponse>;
  RegisterMetric(
    request: RegisterMetricRequest
  ): Promise<RegisterMetricResponse>;
}

export class MetricsClientJSON implements MetricsClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterKind.bind(this);
    this.DeleteKind.bind(this);
    this.GetKinds.bind(this);
    this.RegisterMetric.bind(this);
  }
  RegisterKind(
    request: RegisterMetricKindRequest
  ): Promise<RegisterMetricKindResponse> {
    const data = RegisterMetricKindRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Metrics",
      "RegisterKind",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      RegisterMetricKindResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  DeleteKind(
    request: DeleteMetricKindRequest
  ): Promise<DeleteMetricKindResponse> {
    const data = DeleteMetricKindRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Metrics",
      "DeleteKind",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      DeleteMetricKindResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetKinds(request: GetMetricKindsRequest): Promise<GetMetricKindsResponse> {
    const data = GetMetricKindsRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Metrics",
      "GetKinds",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetMetricKindsResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  RegisterMetric(
    request: RegisterMetricRequest
  ): Promise<RegisterMetricResponse> {
    const data = RegisterMetricRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "elephant.repository.Metrics",
      "RegisterMetric",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      RegisterMetricResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }
}

export class MetricsClientProtobuf implements MetricsClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterKind.bind(this);
    this.DeleteKind.bind(this);
    this.GetKinds.bind(this);
    this.RegisterMetric.bind(this);
  }
  RegisterKind(
    request: RegisterMetricKindRequest
  ): Promise<RegisterMetricKindResponse> {
    const data = RegisterMetricKindRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Metrics",
      "RegisterKind",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      RegisterMetricKindResponse.fromBinary(data as Uint8Array)
    );
  }

  DeleteKind(
    request: DeleteMetricKindRequest
  ): Promise<DeleteMetricKindResponse> {
    const data = DeleteMetricKindRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Metrics",
      "DeleteKind",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      DeleteMetricKindResponse.fromBinary(data as Uint8Array)
    );
  }

  GetKinds(request: GetMetricKindsRequest): Promise<GetMetricKindsResponse> {
    const data = GetMetricKindsRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Metrics",
      "GetKinds",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetMetricKindsResponse.fromBinary(data as Uint8Array)
    );
  }

  RegisterMetric(
    request: RegisterMetricRequest
  ): Promise<RegisterMetricResponse> {
    const data = RegisterMetricRequest.toBinary(request);
    const promise = this.rpc.request(
      "elephant.repository.Metrics",
      "RegisterMetric",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      RegisterMetricResponse.fromBinary(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface MetricsTwirp<T extends TwirpContext = TwirpContext> {
  RegisterKind(
    ctx: T,
    request: RegisterMetricKindRequest
  ): Promise<RegisterMetricKindResponse>;
  DeleteKind(
    ctx: T,
    request: DeleteMetricKindRequest
  ): Promise<DeleteMetricKindResponse>;
  GetKinds(
    ctx: T,
    request: GetMetricKindsRequest
  ): Promise<GetMetricKindsResponse>;
  RegisterMetric(
    ctx: T,
    request: RegisterMetricRequest
  ): Promise<RegisterMetricResponse>;
}

export enum MetricsMethod {
  RegisterKind = "RegisterKind",
  DeleteKind = "DeleteKind",
  GetKinds = "GetKinds",
  RegisterMetric = "RegisterMetric",
}

export const MetricsMethodList = [
  MetricsMethod.RegisterKind,
  MetricsMethod.DeleteKind,
  MetricsMethod.GetKinds,
  MetricsMethod.RegisterMetric,
];

export function createMetricsServer<T extends TwirpContext = TwirpContext>(
  service: MetricsTwirp<T>
) {
  return new TwirpServer<MetricsTwirp, T>({
    service,
    packageName: "elephant.repository",
    serviceName: "Metrics",
    methodList: MetricsMethodList,
    matchRoute: matchMetricsRoute,
  });
}

function matchMetricsRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "RegisterKind":
      return async (
        ctx: T,
        service: MetricsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          RegisterMetricKindRequest,
          RegisterMetricKindResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "RegisterKind" };
        await events.onMatch(ctx);
        return handleMetricsRegisterKindRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "DeleteKind":
      return async (
        ctx: T,
        service: MetricsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          DeleteMetricKindRequest,
          DeleteMetricKindResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "DeleteKind" };
        await events.onMatch(ctx);
        return handleMetricsDeleteKindRequest(ctx, service, data, interceptors);
      };
    case "GetKinds":
      return async (
        ctx: T,
        service: MetricsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetMetricKindsRequest,
          GetMetricKindsResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetKinds" };
        await events.onMatch(ctx);
        return handleMetricsGetKindsRequest(ctx, service, data, interceptors);
      };
    case "RegisterMetric":
      return async (
        ctx: T,
        service: MetricsTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          RegisterMetricRequest,
          RegisterMetricResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "RegisterMetric" };
        await events.onMatch(ctx);
        return handleMetricsRegisterMetricRequest(
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

function handleMetricsRegisterKindRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterMetricKindRequest,
    RegisterMetricKindResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleMetricsRegisterKindJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleMetricsRegisterKindProtobuf<T>(
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

function handleMetricsDeleteKindRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    DeleteMetricKindRequest,
    DeleteMetricKindResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleMetricsDeleteKindJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleMetricsDeleteKindProtobuf<T>(
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

function handleMetricsGetKindsRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetMetricKindsRequest, GetMetricKindsResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleMetricsGetKindsJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleMetricsGetKindsProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleMetricsRegisterMetricRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RegisterMetricRequest, RegisterMetricResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleMetricsRegisterMetricJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleMetricsRegisterMetricProtobuf<T>(
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
async function handleMetricsRegisterKindJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterMetricKindRequest,
    RegisterMetricKindResponse
  >[]
) {
  let request: RegisterMetricKindRequest;
  let response: RegisterMetricKindResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = RegisterMetricKindRequest.fromJson(body, {
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
      RegisterMetricKindRequest,
      RegisterMetricKindResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterKind(ctx, inputReq);
    });
  } else {
    response = await service.RegisterKind(ctx, request!);
  }

  return JSON.stringify(
    RegisterMetricKindResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleMetricsDeleteKindJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    DeleteMetricKindRequest,
    DeleteMetricKindResponse
  >[]
) {
  let request: DeleteMetricKindRequest;
  let response: DeleteMetricKindResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = DeleteMetricKindRequest.fromJson(body, {
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
      DeleteMetricKindRequest,
      DeleteMetricKindResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteKind(ctx, inputReq);
    });
  } else {
    response = await service.DeleteKind(ctx, request!);
  }

  return JSON.stringify(
    DeleteMetricKindResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleMetricsGetKindsJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetMetricKindsRequest, GetMetricKindsResponse>[]
) {
  let request: GetMetricKindsRequest;
  let response: GetMetricKindsResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetMetricKindsRequest.fromJson(body, {
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
      GetMetricKindsRequest,
      GetMetricKindsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetKinds(ctx, inputReq);
    });
  } else {
    response = await service.GetKinds(ctx, request!);
  }

  return JSON.stringify(
    GetMetricKindsResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleMetricsRegisterMetricJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RegisterMetricRequest, RegisterMetricResponse>[]
) {
  let request: RegisterMetricRequest;
  let response: RegisterMetricResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = RegisterMetricRequest.fromJson(body, {
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
      RegisterMetricRequest,
      RegisterMetricResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterMetric(ctx, inputReq);
    });
  } else {
    response = await service.RegisterMetric(ctx, request!);
  }

  return JSON.stringify(
    RegisterMetricResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleMetricsRegisterKindProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    RegisterMetricKindRequest,
    RegisterMetricKindResponse
  >[]
) {
  let request: RegisterMetricKindRequest;
  let response: RegisterMetricKindResponse;

  try {
    request = RegisterMetricKindRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RegisterMetricKindRequest,
      RegisterMetricKindResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterKind(ctx, inputReq);
    });
  } else {
    response = await service.RegisterKind(ctx, request!);
  }

  return Buffer.from(RegisterMetricKindResponse.toBinary(response));
}

async function handleMetricsDeleteKindProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    DeleteMetricKindRequest,
    DeleteMetricKindResponse
  >[]
) {
  let request: DeleteMetricKindRequest;
  let response: DeleteMetricKindResponse;

  try {
    request = DeleteMetricKindRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteMetricKindRequest,
      DeleteMetricKindResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteKind(ctx, inputReq);
    });
  } else {
    response = await service.DeleteKind(ctx, request!);
  }

  return Buffer.from(DeleteMetricKindResponse.toBinary(response));
}

async function handleMetricsGetKindsProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetMetricKindsRequest, GetMetricKindsResponse>[]
) {
  let request: GetMetricKindsRequest;
  let response: GetMetricKindsResponse;

  try {
    request = GetMetricKindsRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetMetricKindsRequest,
      GetMetricKindsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetKinds(ctx, inputReq);
    });
  } else {
    response = await service.GetKinds(ctx, request!);
  }

  return Buffer.from(GetMetricKindsResponse.toBinary(response));
}

async function handleMetricsRegisterMetricProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: MetricsTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RegisterMetricRequest, RegisterMetricResponse>[]
) {
  let request: RegisterMetricRequest;
  let response: RegisterMetricResponse;

  try {
    request = RegisterMetricRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RegisterMetricRequest,
      RegisterMetricResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.RegisterMetric(ctx, inputReq);
    });
  } else {
    response = await service.RegisterMetric(ctx, request!);
  }

  return Buffer.from(RegisterMetricResponse.toBinary(response));
}
