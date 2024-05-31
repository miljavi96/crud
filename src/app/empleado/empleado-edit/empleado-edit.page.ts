import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, getDoc, Firestore, doc, } from '@angular/fire/firestore';
import { Storage, StorageError, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable, deleteObject } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.page.html',
  styleUrls: ['./empleado-edit.page.scss'],
})
export class EmpleadoEditPage implements OnInit {
  salarioValido() {
    const salarioMinimo = 2600000;
    if (this.empleado.salario < salarioMinimo) {
      alert("salario no valido")
      return false;
    }
    return true;
  }



  id: any;

  empleado: any = [];
  avatar: string = '';
  //private storage: Storage = inject(Storage);
  constructor(private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private rt: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    // this.incluirEmpleado();
    //this.editarEmpleado("2BpFVjd1yuhQwrWbRrk2");
    this.route.params.subscribe((params: any) => {
      //console.log('params', params);
      this.id = params.id;
      //console.log('id', this.id);
      if (this.id) {
        this.obtenerEmpleado(this.id);
      }

    });
  }

  incluirEmpleado = () => {
    console.log('aqui incluir en firebase');
    let empleadoRef = collection(this.firestore, 'empleado');

    addDoc(
      empleadoRef,
      {
        documento: this.empleado.documento,
        nombre: this.empleado.nombre,
        apellido: this.empleado.apellido,
        salario: (this.empleado.salario) ? (this.empleado.salario) : 0,
        nacimiento: (this.empleado.nacimiento) ? (new Date(this.empleado.nacimiento)) : new Date(),
        estado: (this.empleado.estado) ? (this.empleado.estado) : false,
      }

    ).then(doc => {
      console.log('registro incluido');
      this.volver();

    }
    ).catch((error) => {
      console.error("Error: ", error);
    });
  }

  editarEmpleado = (id: string) => {
    console.log('aqui editar en firebase');
    const document = doc(this.firestore, 'empleado', this.id);

    updateDoc(
      document,
      {
        documento: this.empleado.documento,
        nombre: this.empleado.nombre,
        apellido: this.empleado.apellido,
        salario: (this.empleado.salario) ? (this.empleado.salario) : 0,
        nacimiento: (this.empleado.nacimiento) ? (new Date(this.empleado.nacimiento)) : new Date(),
        estado: (this.empleado.estado) ? (this.empleado.estado) : false,
      }

    ).then(doc => {
      console.log('registro editado');
      this.volver();

    }
    ).catch((error) => {
      console.error("Error: ", error);
    });
  }

  obtenerEmpleado = (id: string) => {

    const document = doc(this.firestore, 'empleado', id);

    getDoc(document).then(doc => {
      console.log('registro a editar', doc.data());
      if (doc.data()) {
        this.empleado = doc.data();
        const timestamp = this.empleado.nacimiento; // Asume que 'fecha' es el campo Timestamp
        this.empleado.nacimiento = timestamp.toDate().toISOString(); // Convierte a ISO 8601
        if (this.empleado.avatar) {
          this.obtenerAvatarEmpleado();
        }
      } else {
        this.empleado = {};
      }


    });
  }

  volver = () => {
    this.rt.navigate(['/empleado-list']);


  }

  accion = (id: string) => {
    if (this.salarioValido()) {
      if (this.id) {
        //console.log("modificar");
        this.editarEmpleado(this.id);

      } else {
        //console.log("guardar");
        this.incluirEmpleado();

      }
      this.volver();
    }

  }
  uploadFile = (input: HTMLInputElement) => {
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        console.log(file, file.name);
        const storageRef = ref(this.storage, `avatars/empleado/${this.id}`);

        uploadBytesResumable(storageRef, file).on(
          'state_changed',
          this.onUploadChange,
          this.onUploadError,
          this.onUploadComplete,
        );
      }
    }
  }

  onUploadChange = (response: UploadTaskSnapshot) => {
    console.log('onUploadChange', response);
  }

  onUploadError = (error: StorageError) => {
    console.log('onUploadError', error);
  }

  onUploadComplete = () => {
    console.log('upload completo');
    this.editarAvatar();
    this.obtenerAvatarEmpleado();
  }

  editarAvatar = () => {
    const document = doc(this.firestore, "empleado", this.id);
    updateDoc(document, {
      avatar: 'avatars/empleado/' + this.id
    }).then(doc => {
      console.log("Avatar Editado");
    });
  }

  obtenerAvatarEmpleado = () => {
    const storageRef = ref(this.storage, `avatars/empleado/${this.id}`);
    getDownloadURL(storageRef).then(doc => {
      this.avatar = doc;
    });
  }

  eliminarAvatar = () => {
    const avatarRef = ref(this.storage, `avatars/empleado/${this.id}`);

    deleteObject(avatarRef).then(() => {
      console.log('Avatar eliminado exitosamente');
      this.actualizarDocumentoEmpleadoSinAvatar();
    }).catch((error) => {
      console.error('Error al eliminar el avatar: ', error);
    });
  }

  actualizarDocumentoEmpleadoSinAvatar = () => {
    const document = doc(this.firestore, "empleado", this.id);
    updateDoc(document, {
      avatar: ''
    }).then(() => {
      console.log("Referencia del avatar eliminada del documento del empleado");
      this.avatar = ''; // Asegúrate de actualizar también la variable local si es necesario.
    }).catch((error) => {
      console.error("Error al actualizar el documento del empleado: ", error);
    });
  }

}
