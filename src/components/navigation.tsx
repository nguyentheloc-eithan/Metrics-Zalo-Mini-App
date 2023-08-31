import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

import { BottomNavigation, Icon, useNavigate } from "zmp-ui";

const navItems = [
    {
        path: "/revenue",
        label: "Doanh thu",
        icon: <Icon icon="zi-poll" />,
        iconActive: <Icon icon="zi-more-diamond-solid" />,
    },
    {
        path: "/order-bookings",
        label: "Orders",
        icon: <Icon icon="zi-note" />,
        iconActive: <Icon icon="zi-group-solid" />,
    },
    {
        path: "/assistance",
        label: "Thư ký",
        icon: <Icon icon="zi-chat" />,
        iconActive: <Icon icon="zi-chat-solid" />,
    },
    {
        path: "/notifications",
        label: "Thông báo",
        icon: <Icon icon="zi-notif" />,
        iconActive: <Icon icon="zi-notif" />,
    },
    {
        path: "/more",
        label: "Thêm",
        icon: <Icon icon="zi-more-grid" />,
        iconActive: <Icon icon="zi-user-circle-solid" />,
    },
];

export const Navigation: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("/");
    const pathname = location.pathname.split("/")[1];

    useEffect(() => {
        if (navItems.find((item) => item.path === location.pathname)) {
            setActiveTab(location.pathname);
        }
    }, [location]);

    const handleChangeRoute = (key) => {
        setActiveTab(key);
        navigate(key, { animate: false });
    };
    return (
        <>
            {location.pathname !== "/sale-report" &&
                location.pathname !== "/" &&
                location.pathname !== "/staffs" &&
                location.pathname !== "/services" &&
                location.pathname !== "/not-admin" && (
                    <>
                        <BottomNavigation
                            id="bottom-nav"
                            activeKey={activeTab}
                            onChange={(key) => handleChangeRoute(key)}
                        >
                            {navItems.map(
                                ({ path, label, icon, iconActive }) => (
                                    <BottomNavigation.Item
                                        key={path}
                                        label={label}
                                        icon={icon}
                                    />
                                ),
                            )}
                        </BottomNavigation>
                    </>
                )}
        </>
    );
};
