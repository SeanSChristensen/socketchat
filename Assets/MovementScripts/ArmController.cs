using UnityEngine;

public class ArmController : MonoBehaviour
{
    private ConfigurableJoint joint;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        joint = GetComponent<ConfigurableJoint>();
    }

    // Update is called once per frame
    void Update()
    {
        //This is temporary and just for testing
        if (Input.GetKeyDown(KeyCode.W))
        {
            joint.targetRotation = Quaternion.Euler(-45, 45, 0);
        }

        if (Input.GetKeyDown(KeyCode.A))
        {
            joint.targetRotation = Quaternion.Euler(0, 45, 0);
        }

        if (Input.GetKeyDown(KeyCode.S))
        {
            joint.targetRotation = Quaternion.Euler(45, 45, 0);
        }
    }
}
