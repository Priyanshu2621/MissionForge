import { useGLTF } from "@react-three/drei";

export default function ModelLoader({ path, ...props }) {
  const gltf = useGLTF(path);
  return <primitive object={gltf.scene} {...props} />;
}
