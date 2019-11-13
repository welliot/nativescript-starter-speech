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
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <GridLayout class="page-content" columns="*" rows="1*, 2*">
            <Label class="page-icon fa" text.decode="&#xf015;" row="0"></Label>
            <FlexboxLayout class="page-flexbox" flexDirection="column" row="1">
                <Label id="label1" class="large-label">{{ count }}</Label>
                <button text="Click Me" @tap="onButtonTap"/>
                <button text="Me 2" @tap="onButtonTap"/>
                <Label id="label1" class="large-label">{{ clicked }}</Label>
            </FlexboxLayout>
        </GridLayout>

    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import { PluginTutorial } from "nativescript-plugin-tutorial";

    const pluginTutorial = new PluginTutorial();

    export default {
        data() {
            return {
                clickedTxt: pluginTutorial.get()
            };
        },
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Home");
        },
        computed: {
            count() {
                return this.$store.state.count;
            },
            message() {
                return "<!-- Page content goes here -->";
            },
            clicked() {
                return this.$data.clickedTxt;
            }
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onButtonTap(args) {
                this.$store.commit('increaseCount');
                let name = 'Unknown';
                try {
                    name = args.object.text;
                } catch (e) {
                    alert(e.message);
                }
                this.$data.clickedTxt = `Clicked ${  name }`;
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