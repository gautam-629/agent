import { PropsWithChildren } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
const Providers = ({ children }: PropsWithChildren) => {
    return (
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
    );
  };
  
  export default Providers;
  