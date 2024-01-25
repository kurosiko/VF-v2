import { Notification, nativeImage } from "electron";
import { Noti } from "../Noti";
export const c_noti = async (noti_data: Noti) => {
    const t_data = await fetch(noti_data.thumbnail);
    const image = nativeImage.createFromBuffer(
        Buffer.from(await t_data.arrayBuffer())
    );
    const notification = new Notification({
        toastXml: `
            <toast activationType="protocol">
                <visual>
                    <binding template="ToastGeneric" addImageQuery="true">
                        <image placement="hiro" src=${image}/>
                        <text>${noti_data.title}</text>
                        <text>${noti_data.uploader}</text>
                    </binding>
                </visual>
                <actions>
                    <action
                        content="Open Folder"
                        arguments="test"
                        activationType="protocol"/>
                    <action
                        content="Open Link"
                        arguments="${noti_data.base_url.replace(/&/, "&amp;")}"
                        activationType="protocol"/>
                </actions>
            </toast>`,
    });
    notification.show();
};
c_noti({
    title: "test",
    uploader: "me!",
    thumbnail: "https://i.ytimg.com/vi/VTNLVKz_1zc/maxresdefault.jpg",
    base_url: "https://www.youtube.com/watch?v=VTNLVKz_1zc",
});