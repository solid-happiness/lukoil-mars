from concurrent import futures
import grpc
import decisionmaking_pb2_grpc


class DecisionMaking(decisionmaking_pb2_grpc.DecisionmakingServicer):

    def MakeSnapshot(self, request, context):
        '''Метод принятия решений'''
        snapshot = request.snapshot


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    decisionmaking_pb2_grpc.add_DecisionmakingServicer_to_server(
        DecisionMaking(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
