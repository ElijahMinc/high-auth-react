import { FC, SuspenseProps, Suspense } from 'react';

export function withSuspense<WrappedProps extends Record<string, unknown>>(
  WrappedComponent: FC<WrappedProps>,
  suspenseProps: SuspenseProps
): FC<WrappedProps> {
  function WrapperComponent(props: WrappedProps) {
    return (
      <Suspense {...suspenseProps}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  }
  return WrapperComponent;
}
