export interface UltraWalletConnectionData {
  blockchainid: string;
  publicKey: string;
}

export interface UltraWalletResponse<T> {
  status: string;
  data: T;
}

export interface UltraWalletError {
  status: string;
  message: string;
  code?: number;
}

export interface UltraWalletTransactionResponse {
  transactionHash: string;
}

export interface UltraWalletSignMessageResponse {
  signature: string;
}

export interface UltraWalletChainIdResponse {
  chainId: string;
}

export interface UltraWalletPurchaseItem {
  productId: number;
  artifactId: number;
  blockchainTransactionId: string;
}

export interface UltraWalletPurchaseResponse {
  orderHash: string;
  items: UltraWalletPurchaseItem[];
}

export interface UltraWalletConnectOptions {
  onlyIfTrusted?: boolean;
  referralCode?: string;
}

export interface UltraWalletSignOptions {
  signOnly?: boolean;
}

export interface TransactionObject {
  action: string;
  contract: string;
  data: Record<string, unknown>;
}

export interface UltraWallet {
  connect(options?: UltraWalletConnectOptions): Promise<UltraWalletResponse<UltraWalletConnectionData>>;
  disconnect(): Promise<void>;
  getChainId(): Promise<UltraWalletResponse<string>>;
  signTransaction(txObject: TransactionObject | TransactionObject[], options?: UltraWalletSignOptions): Promise<UltraWalletResponse<UltraWalletTransactionResponse>>;
  signMessage(message: string): Promise<UltraWalletResponse<UltraWalletSignMessageResponse>>;
  purchaseItem(itemType: string, itemId: string): Promise<UltraWalletResponse<UltraWalletPurchaseResponse>>;
  on(eventName: string, callback: (...args: unknown[]) => void): void;
  off(eventName: string, callback: (...args: unknown[]) => void): void;
  once(eventName: string, callback: (...args: unknown[]) => void): void;
  prependListener(eventName: string, callback: (...args: unknown[]) => void): void;
  prependOnceListener(eventName: string, callback: (...args: unknown[]) => void): void;
  addListener(eventName: string, callback: (...args: unknown[]) => void): void;
  removeListener(eventName: string, callback: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    ultra?: UltraWallet;
  }
} 