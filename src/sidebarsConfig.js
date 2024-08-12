const sidebarsConfig = {
    accordionItems: [
        {
            eventKey: "0",
            header: "Dashboard",
            icon: "bi-house-door",
            links: [
                {
                    to: "/dashboard",
                    icon: "bi-house-door",
                    label: "1",
                },
                {
                    to: "/settings",
                    icon: "bi-house-door",
                    label: "2",
                },
            ],
        },
        {
            eventKey: "1",
            header: "Dashboard",
            icon: "bi-house-door",
            links: [
                {
                    to: "/dashboard",
                    icon: "bi-house-door",
                    label: "1",
                },
                {
                    to: "/settings",
                    icon: "bi-house-door",
                    label: "2",
                },
            ],
        },
        // 可以繼續添加其他 Accordion.Item 設定
    ],
};

export default sidebarsConfig;