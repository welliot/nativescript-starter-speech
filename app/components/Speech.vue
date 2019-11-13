<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem icon="res://navigation/menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Speech Recognition"></Label>
        </ActionBar>

        <GridLayout class="page-content">
            <Label class="page-icon fa" text.decode="&#xf005;"></Label>
            <Label class="large-label" :text="speechAvailable"></Label>
            <!--Label class="large-label" >AAA {{ xxxx }}</Label-->
        </GridLayout>
    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import { SpeechRecognition } from "nativescript-speech-recognition";

    const speechRecognition = new SpeechRecognition();

    export default {
        data() {
            return {};
        },
        created() {
            speechRecognition.available()
                .then((available) => { this.$store.commit('setSpeechAvailable', {avail: available}); });
        },
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Speech");
            speechRecognition.available().then((available) => { 
                if (available) {
                    speechRecognition.requestPermission().then((granted) => {
                        console.log("Granted? " + granted);
                    });
                    speechRecognition.startListening({
                        locale: "en-US",
                        returnPartialResults: true,
                        onResult: (transcription) => {
                            console.log(`User said: ${transcription.text}`);
                            console.log(`User finished?: ${transcription.finished}`);
                        },
                        onError: (error) => {
                            // because of the way iOS and Android differ, this is either:
                            // - iOS: A 'string', describing the issue. 
                            // - Android: A 'number', referencing an 'ERROR_*' constant from https://developer.android.com/reference/android/speech/SpeechRecognizer.
                            //            If that code is either 6 or 7 you may want to restart listening.
                            console.log(`Error ${ error }`);
                            alert(`Error: `, error);
                        }
                    }).then(
                        (started) => { console.log(`started listening`) }, 
                        (errorMessage) => { console.log(`Error: ${errorMessage}`);}
                    ).catch(
                        (error) => { alert(`Error: `, error); }
                    );
                }
            });
        },
        destroyed() {
            speechRecognition.stopListening().then(
                () => { console.log(`stopped listening`) },
                (errorMessage) => { console.log(`Stop error: ${errorMessage}`); }
            );
        },
        computed: {
            count() {
                return this.$store.state.count;
            },
            message() {
                return "<!-- Page content goes here -->";
            },
            speechAvailable() {
                return this.$store.state.speechAvailable;
            },
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
</style>
