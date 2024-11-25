import { Alert, Icon } from "@lifo123/library";
import { lazy, Suspense } from "react";

const Configuration = lazy(() => import("@/apps/Setting/Configuration"));
const LogReg = lazy(() => import("@/apps/User/LogReg"));

export default function HeaderRight() {
    return (
        <div className="f-row g-3 f-center">
            {/* <span className="d-flex f-center iconBtns pointer" onClick={async () => {
                Alert.custom(<Suspense>
                    <LogReg />
                </Suspense>,
                    {
                        id: 'log-reg',
                        bgClose: true,
                        bgColor: 'transparent',
                        animate: 'custom',
                        startAnim: { top: '5rem' },
                        endAnim: { top: '0rem' },
                    });
            }}>
                <Icon
                    icon="user"
                    className="icon no-select"
                    size={22}
                />
            </span> */}
            <span className="d-flex f-center iconBtns pointer" onClick={async () => {
                Alert.custom(<Suspense>
                    <Configuration />
                </Suspense>,
                    {
                        id: 'config',
                        bgClose: true,
                        bgColor: 'transparent',
                        animate: 'custom',
                        startAnim: { top: '2rem' },
                        endAnim: { top: '0rem' },
                    }
                );
            }}>
                <Icon
                    icon="setting"
                    className="icon no-select"
                    size={23}
                />
            </span>
        </div>
    );
}
