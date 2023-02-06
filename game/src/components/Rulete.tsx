import React, { useState, useEffect } from 'react';
import { createAgoraRtcEngine } from 'react-native-agora';
import { PermissionsAndroid, Platform, View, Text, Button } from "react-native";
import { CameraScreen, CameraType } from 'react-native-camera-kit';
interface Props { }

const AgoraStreaming: React.FC<Props> = () => {
    const [streaming, setStreaming] = useState(false);
    const engine = createAgoraRtcEngine();

    useEffect(() => {
        engine.initialize({ appId: '846cb5359fdc465f951845fbef812fb4' });
        return () => {
            engine.destroy();
        };
    }, []);

    const startStreaming = () => {
        setStreaming(true);
        // code to start the streaming
    };

    const stopStreaming = () => {
        setStreaming(false);
        // code to stop the streaming
    };

    return (
        <View>
            {streaming ? (
                <CameraScreen
                    actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}

                    hideControls={false} // (default false) optional, hides camera controls
                    showCapturedImageCount={false} // (default false) optional, show count for photos taken during that capture session
                />

            ) : null}
            {streaming ? (
                <Button title="Stop Streaming" onPress={stopStreaming} />
            ) : (
                <Button title="Start Streaming" onPress={startStreaming} />
            )}
        </View>
    );
};

export default AgoraStreaming;
