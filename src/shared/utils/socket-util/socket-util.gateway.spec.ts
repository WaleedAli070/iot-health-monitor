import { Test, TestingModule } from '@nestjs/testing';
import { SocketUtilGateway } from './socket-util.gateway';

describe('SocketUtilGateway', () => {
  let gateway: SocketUtilGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketUtilGateway],
    }).compile();

    gateway = module.get<SocketUtilGateway>(SocketUtilGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
