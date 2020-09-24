import {Injectable} from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    loading;

    constructor(
        public toastController: ToastController,
        private loadingController: LoadingController,
        private router: Router
    ) {
    }

    /**
     * Presents a toast on the top of the screen for 2 sec
     * @param message the message to be displayed
     */
    async presentToast(message) {
        const toast = await this.toastController.create({
            message,
            duration: 3000,
            color: 'medium',
            position: 'top',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel'
                }
            ]
        });
        await toast.present();
    }

    /**
     * Presents a warning/error toast (yellow) on the top of the screen for 2 sec
     * @param header the header to be displayed (e.g. Error or Warning)
     * @param message the message to be displayed
     */
    async presentWarningToast(header, message) {
        const toast = await this.toastController.create({
            header,
            message,
            color: 'warning',
            duration: 2000,
            position: 'top',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel'
                }
            ]
        });
        await toast.present();
    }

    /**
     * Presents a notification for 3 seconds
     * @param header the header to be displayed (e.g. Error or Warning)
     * @param message the message to be displayed
     * @param link link
     * @param data data
     */
    async presentNotification(header, message, link, data?) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                data
            }
        };
        const notification = await this.toastController.create({
            header,
            message,
            duration: 3000,
            position: 'top',
            animated: true,
            cssClass: 'custom-notification',
            buttons: [
                {
                    side: 'end',
                    text: 'View',
                    icon: 'arrow-forward-sharp',
                    handler: () => {
                        if (link) {
                            this.router.navigate([link], navigationExtras);
                        }
                    }
                }
            ]
        });
        await notification.present();
    }

    /**
     * Call this method to display a loading animation
     * @param message to be displayed on the loading animation
     */
    async presentLoading(message) {
        this.loading = await this.loadingController.create({
            message
        });
        await this.loading.present();
    }

    /**
     * Call this method to dismiss the loading animation
     */
    dismissLoading() {
        this.loading.dismiss();
    }
}
