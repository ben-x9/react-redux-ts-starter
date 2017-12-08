interface Module {
  hot: {
    accept: (file?: string, cb?: () => void) => void;
    dispose: (callback: () => void) => void;
  } | null
}
